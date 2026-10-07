import {
  addUniqueAchievement,
  uniqueAchievements
} from "./achievementValidator";

export function registerAchievement(
  achievements = [],
  achievement
) {
  return addUniqueAchievement(
    uniqueAchievements(achievements),
    achievement
  );
}

export function unlockAchievement(
  achievements = [],
  achievementId
) {
  const clean = uniqueAchievements(achievements);

  return clean.map((item) => {
    if (
      String(item?.id || "") !==
      String(achievementId || "")
    ) {
      return item;
    }

    return {
      ...item,
      unlocked: true,
      earned: true,
      unlockedAt:
        item.unlockedAt || new Date().toISOString()
    };
  });
}

export function isAchievementUnlocked(
  achievements = [],
  achievementId
) {
  return achievements.some(
    (item) =>
      String(item?.id || "") ===
        String(achievementId || "") &&
      (item?.unlocked === true ||
        item?.earned === true)
  );
}

export function getUnlockedAchievements(
  achievements = []
) {
  return uniqueAchievements(achievements).filter(
    (item) =>
      item?.unlocked === true ||
      item?.earned === true
  );
}

export function getLockedAchievements(
  achievements = []
) {
  return uniqueAchievements(achievements).filter(
    (item) =>
      item?.unlocked !== true &&
      item?.earned !== true
  );
}