import { getData, saveData, STORAGE_KEYS } from "../storage/storage";
import { DEFAULT_PROGRESS } from "../data/appDefaults";
import { calculateNewProgress, getLevelFromPoints } from "./scoring";

function cloneProgress(progress) {
  return JSON.parse(JSON.stringify(progress));
}

export async function getProgress() {
  const saved = await getData(
    STORAGE_KEYS.PROGRESS,
    DEFAULT_PROGRESS
  );

  return {
    ...cloneProgress(DEFAULT_PROGRESS),
    ...saved,
    roles: {
      ...cloneProgress(DEFAULT_PROGRESS).roles,
      ...(saved?.roles || {})
    }
  };
}

export async function saveProgress(progress) {
  return saveData(STORAGE_KEYS.PROGRESS, progress);
}

export async function getRoleProgress(role) {
  const progress = await getProgress();

  return (
    progress.roles?.[role] || {
      completedCases: [],
      unlockedCases: [],
      skill: 0
    }
  );
}

export async function isCaseUnlocked(role, caseId) {
  const roleProgress = await getRoleProgress(role);

  return roleProgress.unlockedCases.includes(caseId);
}

export async function isCaseCompleted(role, caseId) {
  const roleProgress = await getRoleProgress(role);

  return roleProgress.completedCases.includes(caseId);
}

export async function completeCase({
  role,
  caseId,
  nextCaseId = null,
  attempt = 1,
  hintsUsed = 0
}) {
  const progress = await getProgress();

  const currentRole = progress.roles[role] || {
    completedCases: [],
    unlockedCases: [],
    skill: 0
  };

  const result = calculateNewProgress({
    currentPoints: progress.progressPoints,
    currentSkill: currentRole.skill,
    attempt,
    hintsUsed,
    completed: true
  });

  if (!currentRole.completedCases.includes(caseId)) {
    currentRole.completedCases.push(caseId);
  }

  if (
    nextCaseId &&
    !currentRole.unlockedCases.includes(nextCaseId)
  ) {
    currentRole.unlockedCases.push(nextCaseId);
  }

  progress.progressPoints = result.newPoints;

  progress.roles[role] = {
    ...currentRole,
    skill: result.newSkill
  };

  progress.level = getLevelFromPoints(
    progress.progressPoints
  );

  await saveProgress(progress);

  return {
    progress,
    score: result.score,
    addedPoints: result.addedPoints,
    skillIncrease: result.skillIncrease,
    newSkill: result.newSkill,
    level: progress.level
  };
}

export async function unlockCase(role, caseId) {
  const progress = await getProgress();

  if (!progress.roles[role]) {
    progress.roles[role] = {
      completedCases: [],
      unlockedCases: [],
      skill: 0
    };
  }

  if (!progress.roles[role].unlockedCases.includes(caseId)) {
    progress.roles[role].unlockedCases.push(caseId);
  }

  await saveProgress(progress);

  return progress;
}

export async function resetProgress() {
  const freshProgress = cloneProgress(DEFAULT_PROGRESS);

  await saveProgress(freshProgress);

  return freshProgress;
}