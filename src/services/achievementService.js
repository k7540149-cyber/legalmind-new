import {
  getData,
  saveData,
  STORAGE_KEYS
} from "../storage/storage";

import { DEFAULT_ACHIEVEMENTS } from "../data/appDefaults";

import {
  uniqueAchievements
} from "../utils/achievementValidator";

export const ACHIEVEMENT_DEFINITIONS = [
  {
    id: "first-case",
    icon: "⚖️",
    title: "لومړۍ قضیه",
    description: "خپله لومړۍ قضیه بشپړه کړه."
  },
  {
    id: "first-100",
    icon: "⭐",
    title: "لومړۍ بریا",
    description:
      "په یوه قضیه کې 100 د پرمختګ نمرې ترلاسه کړه."
  },
  {
    id: "three-cases",
    icon: "🏆",
    title: "درې قضیې",
    description:
      "درې قضیې بشپړې کړه."
  },
  {
    id: "all-roles",
    icon: "👨‍⚖️",
    title: "درې رولونه",
    description:
      "په ټولو درېیو رولونو کې قضیه بشپړه کړه."
  },
  {
    id: "level-five",
    icon: "🎓",
    title: "لوړه کچه",
    description:
      "پنځمه کچه ترلاسه کړه."
  },
  {
    id: "hidden-001",
    icon: "🔒",
    title: "؟؟؟",
    description:
      "پټه لاسته راوړنه."
  },
  {
    id: "hidden-002",
    icon: "🔒",
    title: "؟؟؟",
    description:
      "پټه لاسته راوړنه."
  }
];

function cleanAchievements(
  achievements = []
) {
  return uniqueAchievements(
    Array.isArray(achievements)
      ? achievements
      : []
  );
}

export async function getAchievements() {
  const saved = await getData(
    STORAGE_KEYS.ACHIEVEMENTS,
    DEFAULT_ACHIEVEMENTS
  );

  return cleanAchievements(saved);
}

export async function saveAchievements(
  achievements
) {
  return saveData(
    STORAGE_KEYS.ACHIEVEMENTS,
    cleanAchievements(achievements)
  );
}

export async function hasAchievement(id) {
  const achievements =
    await getAchievements();

  return achievements.some(
    (achievement) =>
      String(achievement?.id) ===
      String(id)
  );
}

export async function unlockAchievement(
  id,
  score = 0
) {
  const achievements =
    await getAchievements();

  const alreadyUnlocked =
    achievements.some(
      (achievement) =>
        String(achievement?.id) ===
        String(id)
    );

  if (alreadyUnlocked) {
    return {
      unlocked: false,
      achievements
    };
  }

  const definition =
    ACHIEVEMENT_DEFINITIONS.find(
      (item) =>
        item.id === id
    );

  if (!definition) {
    return {
      unlocked: false,
      achievements
    };
  }

  const newAchievement = {
    id: definition.id,
    icon: definition.icon,
    title: definition.title,
    description:
      definition.description,
    unlocked: true,
    earned: true,
    unlockedAt:
      new Date().toISOString(),
    score: Number(score) || 0
  };

  const updated =
    cleanAchievements([
      ...achievements,
      newAchievement
    ]);

  await saveAchievements(updated);

  return {
    unlocked: true,
    achievement: newAchievement,
    achievements: updated
  };
}

export async function evaluateAchievements(
  progress
) {
  if (!progress) {
    return [];
  }

  const unlocked = [];

  const roles =
    progress.roles || {};

  const roleValues =
    Object.values(roles);

  const totalCompleted =
    roleValues.reduce(
      (total, role) =>
        total +
        (Array.isArray(
          role?.completedCases
        )
          ? role.completedCases.length
          : 0),
      0
    );

  if (totalCompleted >= 1) {
    unlocked.push("first-case");
  }

  if (
    Number(
      progress.progressPoints || 0
    ) >= 100
  ) {
    unlocked.push("first-100");
  }

  if (totalCompleted >= 3) {
    unlocked.push("three-cases");
  }

  const allRolesCompleted =
    roleValues.length >= 3 &&
    roleValues.every(
      (role) =>
        Array.isArray(
          role?.completedCases
        ) &&
        role.completedCases.length > 0
    );

  if (allRolesCompleted) {
    unlocked.push("all-roles");
  }

  if (
    Number(progress.level || 1) >= 5
  ) {
    unlocked.push("level-five");
  }

  return [
    ...new Set(unlocked)
  ];
}

export async function updateAchievements(
  progress
) {
  const ids =
    await evaluateAchievements(progress);

  const newlyUnlocked = [];

  for (const id of ids) {
    const result =
      await unlockAchievement(id);

    if (result.unlocked) {
      newlyUnlocked.push(
        result.achievement
      );
    }
  }

  return newlyUnlocked;
}

export function getAchievementDefinition(
  id
) {
  return (
    ACHIEVEMENT_DEFINITIONS.find(
      (item) =>
        item.id === id
    ) || null
  );
}

export async function getUnlockedAchievements() {
  const achievements =
    await getAchievements();

  return achievements.filter(
    (achievement) =>
      achievement?.unlocked === true ||
      achievement?.earned === true
  );
}

export async function getLockedAchievements() {
  const achievements =
    await getAchievements();

  return achievements.filter(
    (achievement) =>
      achievement?.unlocked !== true &&
      achievement?.earned !== true
  );
}

export async function resetAchievements() {
  return saveAchievements(
    DEFAULT_ACHIEVEMENTS
  );
}