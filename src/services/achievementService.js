import {
  getData,
  saveData,
  STORAGE_KEYS
} from "../storage/storage";

import { DEFAULT_ACHIEVEMENTS } from "../data/appDefaults";

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
    description: "په یوه قضیه کې 100 د پرمختګ نمرې ترلاسه کړه."
  },
  {
    id: "three-cases",
    icon: "🏆",
    title: "درې قضیې",
    description: "درې قضیې بشپړې کړه."
  },
  {
    id: "all-roles",
    icon: "👨‍⚖️",
    title: "درې رولونه",
    description: "په ټولو درېیو رولونو کې قضیه بشپړه کړه."
  },
  {
    id: "level-five",
    icon: "🎓",
    title: "لوړه کچه",
    description: "پنځمه کچه ترلاسه کړه."
  },
  {
    id: "hidden-001",
    icon: "🔒",
    title: "؟؟؟",
    description: "پټه لاسته راوړنه."
  },
  {
    id: "hidden-002",
    icon: "🔒",
    title: "؟؟؟",
    description: "پټه لاسته راوړنه."
  }
];

export async function getAchievements() {
  const saved = await getData(
    STORAGE_KEYS.ACHIEVEMENTS,
    DEFAULT_ACHIEVEMENTS
  );

  return Array.isArray(saved)
    ? saved
    : [];
}

export async function saveAchievements(achievements) {
  return saveData(
    STORAGE_KEYS.ACHIEVEMENTS,
    achievements
  );
}

export async function hasAchievement(id) {
  const achievements = await getAchievements();

  return achievements.some(
    (achievement) => achievement.id === id
  );
}

export async function unlockAchievement(id, score = 0) {
  const achievements = await getAchievements();

  if (
    achievements.some(
      (achievement) => achievement.id === id
    )
  ) {
    return {
      unlocked: false,
      achievements
    };
  }

  const definition =
    ACHIEVEMENT_DEFINITIONS.find(
      (item) => item.id === id
    );

  if (!definition) {
    return {
      unlocked: false,
      achievements
    };
  }

  const newAchievement = {
    id: definition.id,
    unlockedAt: new Date().toISOString(),
    score
  };

  const updated = [
    ...achievements,
    newAchievement
  ];

  await saveAchievements(updated);

  return {
    unlocked: true,
    achievement: definition,
    achievements: updated
  };
}

export async function evaluateAchievements(progress) {
  if (!progress) {
    return [];
  }

  const unlocked = [];

  const totalCompleted = Object.values(
    progress.roles || {}
  ).reduce(
    (total, role) =>
      total +
      (role.completedCases?.length || 0),
    0
  );

  if (totalCompleted >= 1) {
    unlocked.push("first-case");
  }

  if (progress.progressPoints >= 100) {
    unlocked.push("first-100");
  }

  if (totalCompleted >= 3) {
    unlocked.push("three-cases");
  }

  const roles = progress.roles || {};

  const allRolesCompleted =
    Object.values(roles).every(
      (role) =>
        (role.completedCases?.length || 0) > 0
    );

  if (allRolesCompleted) {
    unlocked.push("all-roles");
  }

  if ((progress.level || 1) >= 5) {
    unlocked.push("level-five");
  }

  return unlocked;
}

export async function updateAchievements(progress) {
  const ids = await evaluateAchievements(progress);
  const newlyUnlocked = [];

  for (const id of ids) {
    const result = await unlockAchievement(id);

    if (result.unlocked) {
      newlyUnlocked.push(result.achievement);
    }
  }

  return newlyUnlocked;
}

export function getAchievementDefinition(id) {
  return (
    ACHIEVEMENT_DEFINITIONS.find(
      (item) => item.id === id
    ) || null
  );
}