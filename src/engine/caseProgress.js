import {
  getData,
  saveData,
  STORAGE_KEYS
} from "../storage/storage";

import { DEFAULT_PROGRESS } from "../data/appDefaults";

import {
  calculateNewProgress,
  getLevelFromPoints
} from "./scoring";

import {
  clampProgress,
  addUniqueCase
} from "../utils/progressValidator";

function cloneProgress(progress) {
  try {
    return JSON.parse(
      JSON.stringify(progress)
    );
  } catch {
    return JSON.parse(
      JSON.stringify(DEFAULT_PROGRESS)
    );
  }
}

function cleanCaseIds(ids = []) {
  if (!Array.isArray(ids)) {
    return [];
  }

  return [
    ...new Set(
      ids
        .map((id) =>
          String(id || "").trim()
        )
        .filter(Boolean)
    )
  ];
}

function cleanRoleProgress(roleProgress = {}) {
  const defaults = {
    completedCases: [],
    unlockedCases: [],
    skill: 0
  };

  const completedCases =
    cleanCaseIds(
      roleProgress?.completedCases
    );

  const unlockedCases =
    cleanCaseIds(
      roleProgress?.unlockedCases
    );

  const skill =
    Number(roleProgress?.skill);

  return {
    ...defaults,
    ...roleProgress,
    completedCases,
    unlockedCases,
    skill: Number.isFinite(skill)
      ? Math.min(
          100,
          Math.max(
            0,
            Math.floor(skill)
          )
        )
      : 0
  };
}

function cleanProgress(progress = {}) {
  const defaults =
    cloneProgress(
      DEFAULT_PROGRESS
    );

  const merged = {
    ...defaults,
    ...(progress || {})
  };

  const progressPoints =
    Number(merged.progressPoints);

  const level =
    Number(merged.level);

  const roles = {
    ...defaults.roles,
    ...(merged.roles || {})
  };

  const cleanRoles = {};

  for (const role of Object.keys(roles)) {
    cleanRoles[role] =
      cleanRoleProgress(
        roles[role]
      );
  }

  const clean = {
    ...merged,
    progressPoints:
      Number.isFinite(progressPoints)
        ? Math.max(
            0,
            Math.floor(
              progressPoints
            )
          )
        : 0,
    level:
      Number.isFinite(level)
        ? Math.max(
            1,
            Math.floor(level)
          )
        : 1,
    roles: cleanRoles
  };

  return cleanProgressWithValidator(
    clean
  );
}

function cleanProgressWithValidator(
  progress
) {
  try {
    const validated =
      clampProgress(progress);

    return {
      ...progress,
      ...(validated || {}),
      roles: {
        ...progress.roles,
        ...(validated?.roles || {})
      }
    };
  } catch {
    return progress;
  }
}

export async function getProgress() {
  const saved =
    await getData(
      STORAGE_KEYS.PROGRESS,
      DEFAULT_PROGRESS
    );

  return cleanProgress(saved);
}

export async function saveProgress(
  progress
) {
  const clean =
    cleanProgress(progress);

  await saveData(
    STORAGE_KEYS.PROGRESS,
    clean
  );

  return clean;
}

export async function getRoleProgress(
  role
) {
  const cleanRole =
    String(role || "").trim();

  const progress =
    await getProgress();

  if (
    !cleanRole ||
    !progress.roles?.[cleanRole]
  ) {
    return {
      completedCases: [],
      unlockedCases: [],
      skill: 0
    };
  }

  return cleanRoleProgress(
    progress.roles[cleanRole]
  );
}

export async function isCaseUnlocked(
  role,
  caseId
) {
  const cleanRole =
    String(role || "").trim();

  const cleanCaseId =
    String(caseId || "").trim();

  if (
    !cleanRole ||
    !cleanCaseId
  ) {
    return false;
  }

  const roleProgress =
    await getRoleProgress(
      cleanRole
    );

  return roleProgress.unlockedCases.includes(
    cleanCaseId
  );
}

export async function isCaseCompleted(
  role,
  caseId
) {
  const cleanRole =
    String(role || "").trim();

  const cleanCaseId =
    String(caseId || "").trim();

  if (
    !cleanRole ||
    !cleanCaseId
  ) {
    return false;
  }

  const roleProgress =
    await getRoleProgress(
      cleanRole
    );

  return roleProgress.completedCases.includes(
    cleanCaseId
  );
}

export async function completeCase({
  role,
  caseId,
  nextCaseId = null,
  attempt = 1,
  hintsUsed = 0,
  completed = true
}) {
  const cleanRole =
    String(role || "").trim();

  const cleanCaseId =
    String(caseId || "").trim();

  const cleanNextCaseId =
    nextCaseId
      ? String(nextCaseId).trim()
      : null;

  if (
    !cleanRole ||
    !cleanCaseId
  ) {
    return {
      success: false,
      completed: false,
      reason: "missing_role_or_case"
    };
  }

  if (completed !== true) {
    return {
      success: false,
      completed: false,
      score: 0,
      addedPoints: 0
    };
  }

  const progress =
    await getProgress();

  if (!progress.roles[cleanRole]) {
    progress.roles[cleanRole] = {
      completedCases: [],
      unlockedCases: [],
      skill: 0
    };
  }

  const currentRole =
    cleanRoleProgress(
      progress.roles[cleanRole]
    );

  const alreadyCompleted =
    currentRole.completedCases.includes(
      cleanCaseId
    );

  /*
   * A completed case must never
   * give points twice.
   */
  if (alreadyCompleted) {
    return {
      success: false,
      completed: true,
      duplicate: true,
      reason: "case_already_completed",
      progress,
      score: 0,
      addedPoints: 0,
      skillIncrease: 0,
      newSkill: currentRole.skill,
      level: progress.level
    };
  }

  const safeAttempt =
    Math.min(
      100,
      Math.max(
        1,
        Math.floor(
          Number(attempt) || 1
        )
      )
    );

  const safeHints =
    Math.min(
      100,
      Math.max(
        0,
        Math.floor(
          Number(hintsUsed) || 0
        )
      )
    );

  const result =
    calculateNewProgress({
      currentPoints:
        progress.progressPoints,
      currentSkill:
        currentRole.skill,
      attempt:
        safeAttempt,
      hintsUsed:
        safeHints,
      completed: true
    });

  currentRole.completedCases =
    cleanCaseIds([
      ...currentRole.completedCases,
      cleanCaseId
    ]);

  if (cleanNextCaseId) {
    const uniqueResult =
      addUniqueCase(
        currentRole.unlockedCases,
        cleanNextCaseId
      );

    if (
      Array.isArray(
        uniqueResult
      )
    ) {
      currentRole.unlockedCases =
        uniqueResult;
    } else if (
      Array.isArray(
        uniqueResult?.items
      )
    ) {
      currentRole.unlockedCases =
        uniqueResult.items;
    }
  }

  /*
   * Keep all existing unlocked
   * cases and remove duplicates.
   */
  currentRole.unlockedCases =
    cleanCaseIds(
      currentRole.unlockedCases
    );

  progress.progressPoints =
    Math.max(
      0,
      Number(result.newPoints) || 0
    );

  progress.roles[cleanRole] = {
    ...currentRole,
    skill:
      Math.min(
        100,
        Math.max(
          0,
          Number(result.newSkill) || 0
        )
      )
  };

  progress.level =
    getLevelFromPoints(
      progress.progressPoints
    );

  const saved =
    await saveProgress(
      progress
    );

  return {
    success: true,
    completed: true,
    duplicate: false,
    progress: saved,
    score: result.score,
    addedPoints:
      result.addedPoints,
    skillIncrease:
      result.skillIncrease,
    newSkill:
      result.newSkill,
    level:
      saved.level
  };
}

export async function unlockCase(
  role,
  caseId
) {
  const cleanRole =
    String(role || "").trim();

  const cleanCaseId =
    String(caseId || "").trim();

  if (
    !cleanRole ||
    !cleanCaseId
  ) {
    return {
      success: false,
      reason: "missing_role_or_case"
    };
  }

  const progress =
    await getProgress();

  if (!progress.roles[cleanRole]) {
    progress.roles[cleanRole] = {
      completedCases: [],
      unlockedCases: [],
      skill: 0
    };
  }

  const roleProgress =
    cleanRoleProgress(
      progress.roles[cleanRole]
    );

  if (
    roleProgress.unlockedCases.includes(
      cleanCaseId
    )
  ) {
    progress.roles[cleanRole] =
      roleProgress;

    return {
      success: false,
      duplicate: true,
      reason: "case_already_unlocked",
      progress
    };
  }

  roleProgress.unlockedCases =
    cleanCaseIds([
      ...roleProgress.unlockedCases,
      cleanCaseId
    ]);

  progress.roles[cleanRole] =
    roleProgress;

  const saved =
    await saveProgress(
      progress
    );

  return {
    success: true,
    duplicate: false,
    progress: saved
  };
}

export async function resetProgress() {
  const freshProgress =
    cleanProgress(
      cloneProgress(
        DEFAULT_PROGRESS
      )
    );

  await saveProgress(
    freshProgress
  );

  return freshProgress;
}