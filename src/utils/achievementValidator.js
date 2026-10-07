export function uniqueAchievements(achievements = []) {
  const seen = new Set();

  return achievements.filter((achievement) => {
    const id = String(achievement?.id || "").trim();

    if (!id || seen.has(id)) {
      return false;
    }

    seen.add(id);
    return true;
  });
}

export function hasDuplicateAchievement(
  achievements = [],
  id
) {
  const targetId = String(id || "").trim();

  if (!targetId) {
    return false;
  }

  return achievements.filter(
    (achievement) =>
      String(achievement?.id || "").trim() === targetId
  ).length > 1;
}

export function addUniqueAchievement(
  achievements = [],
  achievement
) {
  const id = String(achievement?.id || "").trim();

  if (!id) {
    return achievements;
  }

  const exists = achievements.some(
    (item) =>
      String(item?.id || "").trim() === id
  );

  if (exists) {
    return achievements;
  }

  return [...achievements, achievement];
}

export function markAchievementUnlocked(
  achievements = [],
  id
) {
  return achievements.map((achievement) => {
    if (
      String(achievement?.id || "").trim() !==
      String(id || "").trim()
    ) {
      return achievement;
    }

    return {
      ...achievement,
      unlocked: true,
      earned: true
    };
  });
}