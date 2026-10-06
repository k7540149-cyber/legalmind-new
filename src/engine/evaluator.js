export const EVALUATION_STATUS = {
  CORRECT: "correct",
  NEEDS_REVIEW: "needs_review",
  INCOMPLETE: "incomplete"
};

function normalize(text) {
  if (!text || typeof text !== "string") return "";

  return text
    .toLowerCase()
    .replace(/[،؛,.!?؟:]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function containsAny(text, keywords = []) {
  const normalized = normalize(text);

  return keywords.some((keyword) =>
    normalized.includes(normalize(keyword))
  );
}

function evaluateCriterion(answer, criterion) {
  const normalized = normalize(answer);

  if (!normalized) return false;

  switch (criterion) {
    case "loan_amount":
      return containsAny(normalized, [
        "50000",
        "۵۰،۰۰۰",
        "۵۰۰۰۰",
        "پور",
        "قرض"
      ]);

    case "repayment_date":
      return containsAny(normalized, [
        "نېټه",
        "تاکلې نېټه",
        "ټاکلې نېټه",
        "موعد",
        "date",
        "deadline"
      ]);

    case "written_document":
      return containsAny(normalized, [
        "سند",
        "لیکلی",
        "لیکل شوی",
        "document",
        "written"
      ]);

    case "witness_statement":
      return containsAny(normalized, [
        "شاهد",
        "شهادت",
        "بیان",
        "witness",
        "statement"
      ]);

    case "evidence_based_analysis":
      return containsAny(normalized, [
        "شواهد",
        "دلیل",
        "ثبوت",
        "evidence",
        "proof"
      ]);

    case "distinguish_civil_and_criminal_issue":
      return containsAny(normalized, [
        "حقوقي",
        "مدني",
        "جزايي",
        "جرم",
        "civil",
        "criminal"
      ]);

    case "reasoned_conclusion":
      return containsAny(normalized, [
        "زما نظر",
        "پایله",
        "پرېکړه",
        "نتیجه",
        "conclusion",
        "decision"
      ]);

    case "missing_property":
      return containsAny(normalized, [
        "موبایل",
        "موبایل ورک",
        "ورک",
        "missing",
        "phone"
      ]);

    case "uncertain_identity":
      return containsAny(normalized, [
        "مشخص کس",
        "هویت",
        "نه معلوم",
        "ثبوت نشته",
        "uncertain",
        "identity"
      ]);

    case "security_record":
      return containsAny(normalized, [
        "امنیت",
        "ثبت",
        "کمره",
        "security",
        "record"
      ]);

    case "evidence_sufficiency":
      return containsAny(normalized, [
        "کافي شواهد",
        "کافي نه دي",
        "کافي نه دی",
        "د شواهدو قوت",
        "sufficient evidence"
      ]);

    case "avoid_unproven_accusation":
      return containsAny(normalized, [
        "بې ثبوته",
        "بې دلیله",
        "یوازې شک",
        "تور",
        "accusation",
        "unproven"
      ]);

    case "logical_analysis":
      return containsAny(normalized, [
        "تحلیل",
        "منطقي",
        "ارزونه",
        "analysis",
        "logical"
      ]);

    case "contract_terms":
      return containsAny(normalized, [
        "تړون",
        "قرارداد",
        "شرایط",
        "contract",
        "terms"
      ]);

    case "completion_deadline":
      return containsAny(normalized, [
        "مهلت",
        "موده",
        "نېټه",
        "وخت",
        "deadline",
        "period"
      ]);

    case "required_information":
      return containsAny(normalized, [
        "معلومات",
        "اړین معلومات",
        "لازمي معلومات",
        "information"
      ]);

    case "communication_record":
      return containsAny(normalized, [
        "اړیکې",
        "خبرې",
        "پیغام",
        "ثبت",
        "communication"
      ]);

    case "consider_both_sides":
      return containsAny(normalized, [
        "دواړه خواوې",
        "دواړو لوریو",
        "دواړه لوري",
        "both sides"
      ]);

    case "causation_analysis":
      return containsAny(normalized, [
        "علت",
        "لامل",
        "د ځنډ علت",
        "سبب",
        "causation",
        "cause"
      ]);

    case "evidence_based_defense":
      return containsAny(normalized, [
        "دفاع",
        "شواهد",
        "دفاعي دلیل",
        "evidence",
        "defense"
      ]);

    default:
      return false;
  }
}

export function evaluateCaseAnswer(caseData, answer) {
  if (!caseData || !answer || !answer.trim()) {
    return {
      status: EVALUATION_STATUS.INCOMPLETE,
      matchedCriteria: [],
      missingCriteria: caseData?.evaluation?.requiredFacts || [],
      score: 0,
      completed: false
    };
  }

  const requiredCriteria = [
    ...(caseData.evaluation?.requiredFacts || []),
    ...(caseData.evaluation?.requiredReasoning || [])
  ];

  const matchedCriteria = requiredCriteria.filter((criterion) =>
    evaluateCriterion(answer, criterion)
  );

  const missingCriteria = requiredCriteria.filter(
    (criterion) => !matchedCriteria.includes(criterion)
  );

  const minimumCriteria =
    caseData.evaluation?.minimumCriteria ||
    Math.max(1, Math.ceil(requiredCriteria.length / 2));

  const completed = matchedCriteria.length >= minimumCriteria;

  return {
    status: completed
      ? EVALUATION_STATUS.CORRECT
      : EVALUATION_STATUS.NEEDS_REVIEW,
    matchedCriteria,
    missingCriteria,
    score: matchedCriteria.length,
    totalCriteria: requiredCriteria.length,
    completed
  };
}

export function getFeedback(caseData, evaluationResult, attempt) {
  if (!caseData || !evaluationResult) {
    return {
      type: "hint",
      message: "خپل نظر ولیکه او بیا یې ثبت کړه."
    };
  }

  if (evaluationResult.completed) {
    return {
      type: "success",
      message:
        "ستاسې نظر د قضیې له مهمو معیارونو سره کافي مطابقت لري."
    };
  }

  const hints = caseData.hints || {};

  if (attempt <= 1 && hints.first) {
    return {
      type: "hint",
      message: hints.first.pashto
    };
  }

  if (attempt === 2 && hints.second) {
    return {
      type: "hint",
      message: hints.second.pashto
    };
  }

  if (attempt >= 3 && hints.third) {
    return {
      type: "guidance",
      message: hints.third.pashto
    };
  }

  return {
    type: "hint",
    message: "شواهد، قانوني موضوع او خپل استدلال بیا وارزوه."
  };
}

export function canCompleteCase(caseData, answer, attempt = 1) {
  const result = evaluateCaseAnswer(caseData, answer);

  return {
    ...result,
    attempt,
    feedback: getFeedback(caseData, result, attempt)
  };
}