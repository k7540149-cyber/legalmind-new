import { ROLES } from "../data/roles";

export function clampProgress(value = 0) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return 0;
  }

  return Math.max(0, Math.min(100, number));
}

export function clampPoints(value = 0) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return 0;
  }

  return Math.max(0, Math.floor(number));
}

export function validateRoleProgress(role = {}) {
  return {
    completedCases: Array.isArray(role?.completedCases)
      ? [...new Set(role.completedCases.filter(Boolean))]
      : [],

    unlockedCases: Array.isArray(role?.unlockedCases)
      ? [...new Set(role.unlockedCases.filter(Boolean))]
      : [],

    skill: clampProgress(role?.skill),
  };
}

export function validateProgress(progress = {}) {
  const roles = progress?.roles || {};

  return {
    ...progress,

    level: Math.max(
      1,
      Number.isFinite(Number(progress?.level))
        ? Math.floor(Number(progress.level))
        : 1
    ),

    progressPoints: clampPoints(
      progress?.progressPoints
    ),

    roles: {
      [ROLES.JUDGE]: validateRoleProgress(
        roles?.[ROLES.JUDGE]
      ),

      [ROLES.PROSECUTOR]: validateRoleProgress(
        roles?.[ROLES.PROSECUTOR]
      ),

      [ROLES.DEFENSE]: validateRoleProgress(
        roles?.[ROLES.DEFENSE]
      ),
    },
  };
}

export function addProgressPoints(
  currentPoints = 0,
  pointsToAdd = 0
) {
  const current = clampPoints(currentPoints);
  const added = Math.max(
    0,
    Math.floor(Number(pointsToAdd) || 0)
  );

  return current + added;
}

export function addUniqueCase(
  caseIds = [],
  caseId
) {
  const existing = Array.isArray(caseIds)
    ? caseIds.filter(Boolean)
    : [];

  if (!caseId) {
    return [...new Set(existing)];
  }

  return [
    ...new Set([
      ...existing,
      caseId,
    ]),
  ];
}