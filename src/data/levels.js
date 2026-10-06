export const DIFFICULTY_LEVELS = [
  {
    id: 1,
    key: "veryEasy",
    pashto: "ډېرې ساده",
    dari: "بسیار ساده",
    english: "Very Easy"
  },
  {
    id: 2,
    key: "easy",
    pashto: "ساده",
    dari: "ساده",
    english: "Easy"
  },
  {
    id: 3,
    key: "medium",
    pashto: "منځنۍ",
    dari: "متوسط",
    english: "Medium"
  },
  {
    id: 4,
    key: "fairlyDifficult",
    pashto: "نسبتاً پېچلې",
    dari: "نسبتاً پیچیده",
    english: "Fairly Difficult"
  },
  {
    id: 5,
    key: "difficult",
    pashto: "پېچلې",
    dari: "پیچیده",
    english: "Difficult"
  },
  {
    id: 6,
    key: "veryDifficult",
    pashto: "ډېره پېچلې",
    dari: "بسیار پیچیده",
    english: "Very Difficult"
  }
];

export const SCORE_RULES = {
  firstAttempt: 100,
  secondAttempt: 85,
  thirdAttempt: 70,
  fourthAttempt: 55,
  laterAttemptsMinimum: 40
};

export function getDifficulty(id) {
  return (
    DIFFICULTY_LEVELS.find((level) => level.id === id) ||
    DIFFICULTY_LEVELS[0]
  );
}

export function calculateScore(attempt) {
  if (attempt <= 1) return SCORE_RULES.firstAttempt;
  if (attempt === 2) return SCORE_RULES.secondAttempt;
  if (attempt === 3) return SCORE_RULES.thirdAttempt;
  if (attempt === 4) return SCORE_RULES.fourthAttempt;

  return SCORE_RULES.laterAttemptsMinimum;
}