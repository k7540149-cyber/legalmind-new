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
    skill: clampProgress(role?.skill),
    unlockedCases: Array.isArray(role?.unlockedCases)
      ? [...new Set(role.unlockedCases)]
      : [],
    completedCases: Array.isArray(role?.completedCases)
      ? [...new Set(role.completedCases)]
      : []
  };
}

export function validateProgress(progress = {}) {
  const judge = validateRoleProgress(progress?.judge);
  const prosecutor = validateRoleProgress(progress?.prosecutor);
  const defense = validateRoleProgress(progress?.defense);

  return {
    ...progress,
    level: Math.max(
      1,
      Number.isFinite(Number(progress?.level))
        ? Math.floor(Number(progress.level))
        : 1
    ),
    points: clampPoints(progress?.points),
    judge,
    prosecutor,
    defense
  };
}

export function addProgressPoints(
  currentPoints = 0,
  pointsToAdd = 0
) {
  return clampPoints(currentPoints) +
    Math.max(0, Math.floor(Number(pointsToAdd) || 0));
}

export function addUniqueCase(
  caseIds = [],
  caseId
) {
  if (!caseId) {
    return [...new Set(caseIds)];
  }

  return [
    ...new Set([
      ...(Array.isArray(caseIds) ? caseIds : []),
      caseId
    ])
  ];
}