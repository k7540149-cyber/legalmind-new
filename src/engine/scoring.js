import { calculateScore } from "../data/levels";

export function getAttemptScore(attempt) {
  return calculateScore(attempt);
}

export function calculateFinalScore({
  attempt = 1,
  hintsUsed = 0,
  completed = false
}) {
  if (!completed) {
    return 0;
  }

  const baseScore = getAttemptScore(attempt);

  const hintPenalty = Math.min(hintsUsed * 5, 20);

  return Math.max(40, baseScore - hintPenalty);
}

export function calculateSkillIncrease(score) {
  if (score >= 95) return 10;
  if (score >= 80) return 8;
  if (score >= 65) return 6;
  if (score >= 50) return 4;

  return 2;
}

export function calculateNewProgress({
  currentPoints = 0,
  currentSkill = 0,
  attempt = 1,
  hintsUsed = 0,
  completed = false
}) {
  const score = calculateFinalScore({
    attempt,
    hintsUsed,
    completed
  });

  if (!completed) {
    return {
      score: 0,
      addedPoints: 0,
      newPoints: currentPoints,
      skillIncrease: 0,
      newSkill: currentSkill
    };
  }

  const skillIncrease = calculateSkillIncrease(score);

  const newPoints = currentPoints + score;

  const newSkill = Math.min(
    100,
    currentSkill + skillIncrease
  );

  return {
    score,
    addedPoints: score,
    newPoints,
    skillIncrease,
    newSkill
  };
}

export function getLevelFromPoints(points = 0) {
  if (points >= 3000) return 10;
  if (points >= 2500) return 9;
  if (points >= 2000) return 8;
  if (points >= 1500) return 7;
  if (points >= 1100) return 6;
  if (points >= 750) return 5;
  if (points >= 500) return 4;
  if (points >= 300) return 3;
  if (points >= 150) return 2;

  return 1;
}