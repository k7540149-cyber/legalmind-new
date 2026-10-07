import {
  getData,
  saveData,
  STORAGE_KEYS
} from "../storage/storage";

import {
  getCaseById,
  getCasesByRole
} from "../data/cases";

import {
  getRoleProgress,
  completeCase as completeCaseProgress,
  unlockCase as unlockProgressCase
} from "../engine/caseProgress";

import { uniqueById } from "../utils/uniqueData";

const DEFAULT_CASE_STATE = {
  activeCaseId: null,
  role: null,
  attempt: 0,
  hintsUsed: 0,
  startedAt: null,
  completed: false
};

function cleanCaseState(state = {}) {
  return {
    ...DEFAULT_CASE_STATE,
    ...state,
    attempt: Math.max(0, Number(state?.attempt) || 0),
    hintsUsed: Math.max(
      0,
      Number(state?.hintsUsed) || 0
    )
  };
}

async function saveCaseState(state) {
  const cleanState = cleanCaseState(state);

  await saveData(
    STORAGE_KEYS.CASES,
    cleanState
  );

  return cleanState;
}

export async function getActiveCase() {
  const state = await getData(
    STORAGE_KEYS.CASES,
    DEFAULT_CASE_STATE
  );

  const cleanState = cleanCaseState(state);

  if (!cleanState.activeCaseId) {
    return null;
  }

  return getCaseById(cleanState.activeCaseId) || null;
}

export async function getCaseState() {
  const state = await getData(
    STORAGE_KEYS.CASES,
    DEFAULT_CASE_STATE
  );

  return cleanCaseState(state);
}

export async function startCase(caseId, role) {
  const caseData = getCaseById(caseId);

  if (!caseData) {
    return {
      success: false,
      reason: "case_not_found"
    };
  }

  const caseRole = role || caseData.role;

  const canOpen = await canOpenCase(
    caseId,
    caseRole
  );

  if (!canOpen) {
    return {
      success: false,
      reason: "case_locked"
    };
  }

  const state = {
    ...DEFAULT_CASE_STATE,
    activeCaseId: caseId,
    role: caseRole,
    attempt: 0,
    hintsUsed: 0,
    startedAt: new Date().toISOString(),
    completed: false
  };

  const saved = await saveCaseState(state);

  return {
    success: true,
    caseData,
    state: saved
  };
}

export async function addAttempt() {
  const state = await getCaseState();

  const updated = {
    ...state,
    attempt: state.attempt + 1
  };

  return saveCaseState(updated);
}

export async function addHint() {
  const state = await getCaseState();

  const updated = {
    ...state,
    hintsUsed: state.hintsUsed + 1
  };

  return saveCaseState(updated);
}

export async function finishCase({
  caseId,
  role,
  completed = false
}) {
  if (!caseId || !role) {
    return {
      success: false,
      reason: "missing_case_or_role"
    };
  }

  const state = await getCaseState();

  const attempt = Math.max(
    1,
    state.attempt || 1
  );

  const hintsUsed = Math.max(
    0,
    state.hintsUsed || 0
  );

  if (!completed) {
    return {
      success: false,
      completed: false,
      score: 0,
      attempt,
      hintsUsed
    };
  }

  const result = await completeCaseProgress({
    role,
    caseId,
    attempt,
    hintsUsed,
    completed: true
  });

  await saveCaseState({
    ...DEFAULT_CASE_STATE,
    completed: true
  });

  return {
    success: true,
    completed: true,
    ...result
  };
}

export async function getNextCase(role) {
  if (!role) {
    return null;
  }

  const cases = uniqueById(
    getCasesByRole(role)
  );

  const progress = await getRoleProgress(role);

  const completedCases = Array.isArray(
    progress?.completedCases
  )
    ? progress.completedCases
    : [];

  const unlockedCases = Array.isArray(
    progress?.unlockedCases
  )
    ? progress.unlockedCases
    : [];

  return (
    cases.find(
      (item) =>
        unlockedCases.includes(item.id) &&
        !completedCases.includes(item.id)
    ) || null
  );
}

export async function getRoleCases(role) {
  if (!role) {
    return [];
  }

  const cases = uniqueById(
    getCasesByRole(role)
  );

  const progress = await getRoleProgress(role);

  const completedCases = Array.isArray(
    progress?.completedCases
  )
    ? progress.completedCases
    : [];

  const unlockedCases = Array.isArray(
    progress?.unlockedCases
  )
    ? progress.unlockedCases
    : [];

  return cases.map((caseData) => ({
    ...caseData,
    unlocked:
      unlockedCases.includes(caseData.id),
    completed:
      completedCases.includes(caseData.id)
  }));
}

export async function unlockNextCase(role) {
  if (!role) {
    return {
      success: false,
      reason: "missing_role"
    };
  }

  const cases = uniqueById(
    getCasesByRole(role)
  );

  const progress = await getRoleProgress(role);

  const completedCases = Array.isArray(
    progress?.completedCases
  )
    ? progress.completedCases
    : [];

  const unlockedCases = Array.isArray(
    progress?.unlockedCases
  )
    ? progress.unlockedCases
    : [];

  const nextCase = cases.find(
    (item) =>
      !completedCases.includes(item.id) &&
      !unlockedCases.includes(item.id)
  );

  if (!nextCase) {
    return {
      success: false,
      reason: "no_next_case",
      caseData: null
    };
  }

  await unlockProgressCase(
    role,
    nextCase.id
  );

  return {
    success: true,
    caseData: nextCase
  };
}

export async function canOpenCase(
  caseId,
  role
) {
  if (!caseId || !role) {
    return false;
  }

  const caseData = getCaseById(caseId);

  if (!caseData) {
    return false;
  }

  const progress = await getRoleProgress(role);

  const unlockedCases = Array.isArray(
    progress?.unlockedCases
  )
    ? progress.unlockedCases
    : [];

  const completedCases = Array.isArray(
    progress?.completedCases
  )
    ? progress.completedCases
    : [];

  if (completedCases.includes(caseId)) {
    return true;
  }

  return unlockedCases.includes(caseId);
}

export async function resetCaseState() {
  return saveCaseState(
    DEFAULT_CASE_STATE
  );
}