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
  const attempt = Number(state?.attempt);
  const hintsUsed = Number(state?.hintsUsed);

  return {
    ...DEFAULT_CASE_STATE,
    ...state,
    activeCaseId:
      typeof state?.activeCaseId === "string"
        ? state.activeCaseId.trim() || null
        : null,
    role:
      typeof state?.role === "string"
        ? state.role.trim() || null
        : null,
    attempt: Number.isFinite(attempt)
      ? Math.max(0, Math.floor(attempt))
      : 0,
    hintsUsed: Number.isFinite(hintsUsed)
      ? Math.max(0, Math.floor(hintsUsed))
      : 0,
    completed:
      state?.completed === true
  };
}

function cleanCaseIds(ids = []) {
  if (!Array.isArray(ids)) {
    return [];
  }

  return [
    ...new Set(
      ids
        .map((id) => String(id || "").trim())
        .filter(Boolean)
    )
  ];
}

function getCleanCases(role) {
  if (!role) {
    return [];
  }

  return uniqueById(
    getCasesByRole(role)
      .filter((item) => item?.id)
      .map((item) => ({
        ...item,
        id: String(item.id).trim()
      }))
  );
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
  const state = await getCaseState();

  if (!state.activeCaseId) {
    return null;
  }

  const caseData =
    getCaseById(state.activeCaseId);

  return caseData || null;
}

export async function getCaseState() {
  const state = await getData(
    STORAGE_KEYS.CASES,
    DEFAULT_CASE_STATE
  );

  return cleanCaseState(state);
}

export async function startCase(
  caseId,
  role
) {
  const cleanCaseId =
    String(caseId || "").trim();

  const cleanRole =
    String(role || "").trim();

  if (!cleanCaseId) {
    return {
      success: false,
      reason: "missing_case_id"
    };
  }

  const caseData =
    getCaseById(cleanCaseId);

  if (!caseData) {
    return {
      success: false,
      reason: "case_not_found"
    };
  }

  const caseRole =
    cleanRole || caseData.role;

  if (!caseRole) {
    return {
      success: false,
      reason: "missing_role"
    };
  }

  const canOpen =
    await canOpenCase(
      cleanCaseId,
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
    activeCaseId: cleanCaseId,
    role: caseRole,
    attempt: 0,
    hintsUsed: 0,
    startedAt:
      new Date().toISOString(),
    completed: false
  };

  const saved =
    await saveCaseState(state);

  return {
    success: true,
    caseData,
    state: saved
  };
}

export async function addAttempt() {
  const state =
    await getCaseState();

  if (!state.activeCaseId) {
    return {
      ...state,
      attempt: 0
    };
  }

  const updated = {
    ...state,
    attempt:
      Math.min(
        state.attempt + 1,
        100
      )
  };

  return saveCaseState(updated);
}

export async function addHint() {
  const state =
    await getCaseState();

  if (!state.activeCaseId) {
    return {
      ...state,
      hintsUsed: 0
    };
  }

  const updated = {
    ...state,
    hintsUsed:
      Math.min(
        state.hintsUsed + 1,
        100
      )
  };

  return saveCaseState(updated);
}

export async function finishCase({
  caseId,
  role,
  completed = false
}) {
  const cleanCaseId =
    String(caseId || "").trim();

  const cleanRole =
    String(role || "").trim();

  if (!cleanCaseId || !cleanRole) {
    return {
      success: false,
      reason: "missing_case_or_role"
    };
  }

  const caseData =
    getCaseById(cleanCaseId);

  if (!caseData) {
    return {
      success: false,
      reason: "case_not_found"
    };
  }

  const state =
    await getCaseState();

  const attempt =
    Math.max(
      1,
      Number(state.attempt) || 1
    );

  const hintsUsed =
    Math.max(
      0,
      Number(state.hintsUsed) || 0
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

  const result =
    await completeCaseProgress({
      role: cleanRole,
      caseId: cleanCaseId,
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
    caseId: cleanCaseId,
    role: cleanRole,
    attempt,
    hintsUsed,
    ...result
  };
}

export async function getNextCase(
  role
) {
  const cleanRole =
    String(role || "").trim();

  if (!cleanRole) {
    return null;
  }

  const cases =
    getCleanCases(cleanRole);

  const progress =
    await getRoleProgress(
      cleanRole
    );

  const completedCases =
    cleanCaseIds(
      progress?.completedCases
    );

  const unlockedCases =
    cleanCaseIds(
      progress?.unlockedCases
    );

  return (
    cases.find(
      (item) =>
        unlockedCases.includes(
          item.id
        ) &&
        !completedCases.includes(
          item.id
        )
    ) || null
  );
}

export async function getRoleCases(
  role
) {
  const cleanRole =
    String(role || "").trim();

  if (!cleanRole) {
    return [];
  }

  const cases =
    getCleanCases(cleanRole);

  const progress =
    await getRoleProgress(
      cleanRole
    );

  const completedCases =
    cleanCaseIds(
      progress?.completedCases
    );

  const unlockedCases =
    cleanCaseIds(
      progress?.unlockedCases
    );

  return cases.map(
    (caseData) => ({
      ...caseData,
      unlocked:
        unlockedCases.includes(
          caseData.id
        ),
      completed:
        completedCases.includes(
          caseData.id
        )
    })
  );
}

export async function unlockNextCase(
  role
) {
  const cleanRole =
    String(role || "").trim();

  if (!cleanRole) {
    return {
      success: false,
      reason: "missing_role"
    };
  }

  const cases =
    getCleanCases(cleanRole);

  const progress =
    await getRoleProgress(
      cleanRole
    );

  const completedCases =
    cleanCaseIds(
      progress?.completedCases
    );

  const unlockedCases =
    cleanCaseIds(
      progress?.unlockedCases
    );

  const nextCase =
    cases.find(
      (item) =>
        !completedCases.includes(
          item.id
        ) &&
        !unlockedCases.includes(
          item.id
        )
    );

  if (!nextCase) {
    return {
      success: false,
      reason: "no_next_case",
      caseData: null
    };
  }

  const unlockResult =
    await unlockProgressCase(
      cleanRole,
      nextCase.id
    );

  return {
    success: true,
    caseData: nextCase,
    result: unlockResult
  };
}

export async function canOpenCase(
  caseId,
  role
) {
  const cleanCaseId =
    String(caseId || "").trim();

  const cleanRole =
    String(role || "").trim();

  if (!cleanCaseId || !cleanRole) {
    return false;
  }

  const caseData =
    getCaseById(cleanCaseId);

  if (!caseData) {
    return false;
  }

  const progress =
    await getRoleProgress(
      cleanRole
    );

  const unlockedCases =
    cleanCaseIds(
      progress?.unlockedCases
    );

  const completedCases =
    cleanCaseIds(
      progress?.completedCases
    );

  if (
    completedCases.includes(
      cleanCaseId
    )
  ) {
    return true;
  }

  return unlockedCases.includes(
    cleanCaseId
  );
}

export async function resetCaseState() {
  return saveCaseState(
    DEFAULT_CASE_STATE
  );
}