import {
  getData,
  saveData,
  STORAGE_KEYS
} from "../storage/storage";

import {
  DEFAULT_CASE_STATE
} from "../data/appDefaults";

import {
  getCaseById,
  getCasesByRole
} from "../data/cases";

import {
  getRoleProgress,
  isCaseUnlocked,
  isCaseCompleted,
  completeCase,
  unlockCase
} from "../engine/caseProgress";

export async function getCaseState() {
  const saved = await getData(
    STORAGE_KEYS.CASES,
    DEFAULT_CASE_STATE
  );

  return {
    ...DEFAULT_CASE_STATE,
    ...(saved || {})
  };
}

export async function saveCaseState(state) {
  return saveData(
    STORAGE_KEYS.CASES,
    {
      ...DEFAULT_CASE_STATE,
      ...(state || {})
    }
  );
}

export async function startCase(role, caseId) {
  const caseData = getCaseById(caseId);

  if (!caseData) {
    return {
      success: false,
      error: "قضیه پیدا نه شوه."
    };
  }

  const unlocked = await isCaseUnlocked(
    role,
    caseId
  );

  if (!unlocked) {
    return {
      success: false,
      error: "دا قضیه لا تر اوسه نه ده پرانیستل شوې."
    };
  }

  const state = {
    activeCaseId: caseId,
    role,
    attempts: 0,
    hintsUsed: 0,
    submitted: false,
    completed: false
  };

  await saveCaseState(state);

  return {
    success: true,
    caseData,
    state
  };
}

export async function getActiveCase() {
  const state = await getCaseState();

  if (!state.activeCaseId) {
    return {
      state,
      caseData: null
    };
  }

  return {
    state,
    caseData: getCaseById(
      state.activeCaseId
    )
  };
}

export async function recordAttempt() {
  const state = await getCaseState();

  const updated = {
    ...state,
    attempts: (state.attempts || 0) + 1,
    submitted: true
  };

  await saveCaseState(updated);

  return updated;
}

export async function recordHint() {
  const state = await getCaseState();

  const updated = {
    ...state,
    hintsUsed: (state.hintsUsed || 0) + 1
  };

  await saveCaseState(updated);

  return updated;
}

export async function finishCase({
  role,
  caseId,
  nextCaseId = null,
  attempt = 1,
  hintsUsed = 0
}) {
  const result = await completeCase({
    role,
    caseId,
    nextCaseId,
    attempt,
    hintsUsed
  });

  await saveCaseState({
    activeCaseId: null,
    role: null,
    attempts: 0,
    hintsUsed: 0,
    submitted: false,
    completed: false
  });

  return result;
}

export async function getNextCase(role) {
  const cases = getCasesByRole(role);
  const progress = await getRoleProgress(role);

  const completed = progress.completedCases || [];
  const unlocked = progress.unlockedCases || [];

  return (
    cases.find(
      (item) =>
        unlocked.includes(item.id) &&
        !completed.includes(item.id)
    ) || null
  );
}

export async function getRoleCases(role) {
  const cases = getCasesByRole(role);
  const progress = await getRoleProgress(role);

  return cases.map((item) => ({
    ...item,
    unlocked: progress.unlockedCases.includes(
      item.id
    ),
    completed: progress.completedCases.includes(
      item.id
    )
  }));
}

export async function unlockNextCase(
  role,
  nextCaseId
) {
  if (!nextCaseId) {
    return getRoleProgress(role);
  }

  return unlockCase(
    role,
    nextCaseId
  );
}

export async function resetCaseState() {
  await saveCaseState(
    DEFAULT_CASE_STATE
  );

  return DEFAULT_CASE_STATE;
}

export async function canOpenCase(
  role,
  caseId
) {
  const caseData = getCaseById(caseId);

  if (!caseData) {
    return false;
  }

  const unlocked =
    await isCaseUnlocked(
      role,
      caseId
    );

  const completed =
    await isCaseCompleted(
      role,
      caseId
    );

  return unlocked && !completed;
}