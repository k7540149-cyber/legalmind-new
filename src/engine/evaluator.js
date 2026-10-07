export const EVALUATION_STATUS = {
  CORRECT: "correct",
  NEEDS_REVIEW: "needs_review",
  INCOMPLETE: "incomplete"
};

function normalize(text) {
  if (
    text === null ||
    text === undefined
  ) {
    return "";
  }

  return String(text)
    .toLowerCase()
    .replace(/[،؛,.!?؟:(){}[\]"'«»]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function containsAny(
  text,
  keywords = []
) {
  const normalized =
    normalize(text);

  if (!normalized) {
    return false;
  }

  return keywords.some(
    (keyword) => {
      const cleanKeyword =
        normalize(keyword);

      return (
        cleanKeyword &&
        normalized.includes(
          cleanKeyword
        )
      );
    }
  );
}

const CRITERION_KEYWORDS = {
  loan_amount: [
    "50000",
    "۵۰،۰۰۰",
    "۵۰۰۰۰",
    "پور",
    "قرض"
  ],

  repayment_date: [
    "نېټه",
    "تاکلې نېټه",
    "ټاکلې نېټه",
    "موعد",
    "date",
    "deadline"
  ],

  written_document: [
    "سند",
    "لیکلی",
    "لیکل شوی",
    "document",
    "written"
  ],

  witness_statement: [
    "شاهد",
    "شهادت",
    "بیان",
    "witness",
    "statement"
  ],

  evidence_based_analysis: [
    "شواهد",
    "دلیل",
    "ثبوت",
    "evidence",
    "proof"
  ],

  distinguish_civil_and_criminal_issue: [
    "حقوقي",
    "مدني",
    "جزايي",
    "جرم",
    "civil",
    "criminal"
  ],

  reasoned_conclusion: [
    "زما نظر",
    "پایله",
    "پرېکړه",
    "نتیجه",
    "conclusion",
    "decision"
  ],

  missing_property: [
    "موبایل",
    "موبایل ورک",
    "ورک",
    "missing",
    "phone"
  ],

  uncertain_identity: [
    "مشخص کس",
    "هویت",
    "نه معلوم",
    "ثبوت نشته",
    "uncertain",
    "identity"
  ],

  security_record: [
    "امنیت",
    "ثبت",
    "کمره",
    "امنیتي ثبت",
    "security",
    "record"
  ],

  evidence_sufficiency: [
    "کافي شواهد",
    "کافي نه دي",
    "کافي نه دی",
    "د شواهدو قوت",
    "sufficient evidence"
  ],

  avoid_unproven_accusation: [
    "بې ثبوته",
    "بې دلیله",
    "یوازې شک",
    "تور",
    "accusation",
    "unproven"
  ],

  logical_analysis: [
    "تحلیل",
    "منطقي",
    "ارزونه",
    "analysis",
    "logical"
  ],

  contract_terms: [
    "تړون",
    "قرارداد",
    "شرایط",
    "contract",
    "terms"
  ],

  completion_deadline: [
    "مهلت",
    "موده",
    "نېټه",
    "وخت",
    "deadline",
    "period"
  ],

  required_information: [
    "معلومات",
    "اړین معلومات",
    "لازمي معلومات",
    "information"
  ],

  communication_record: [
    "اړیکې",
    "خبرې",
    "پیغام",
    "ثبت",
    "communication"
  ],

  consider_both_sides: [
    "دواړه خواوې",
    "دواړو لوریو",
    "دواړه لوري",
    "both sides"
  ],

  causation_analysis: [
    "علت",
    "لامل",
    "د ځنډ علت",
    "سبب",
    "causation",
    "cause"
  ],

  evidence_based_defense: [
    "دفاع",
    "شواهد",
    "دفاعي دلیل",
    "evidence",
    "defense"
  ]
};

function evaluateCriterion(
  answer,
  criterion
) {
  const keywords =
    CRITERION_KEYWORDS[
      criterion
    ];

  if (!keywords) {
    return false;
  }

  return containsAny(
    answer,
    keywords
  );
}

function cleanCriteria(criteria) {
  if (!Array.isArray(criteria)) {
    return [];
  }

  return [
    ...new Set(
      criteria
        .map((item) =>
          String(item || "").trim()
        )
        .filter(Boolean)
    )
  ];
}

function getRequiredCriteria(
  caseData
) {
  const requiredFacts =
    cleanCriteria(
      caseData?.evaluation
        ?.requiredFacts
    );

  const requiredReasoning =
    cleanCriteria(
      caseData?.evaluation
        ?.requiredReasoning
    );

  return [
    ...new Set([
      ...requiredFacts,
      ...requiredReasoning
    ])
  ];
}

function getMinimumCriteria(
  caseData,
  totalCriteria
) {
  const configured =
    Number(
      caseData?.evaluation
        ?.minimumCriteria
    );

  if (
    Number.isFinite(configured) &&
    configured > 0
  ) {
    return Math.min(
      Math.floor(configured),
      totalCriteria
    );
  }

  return Math.max(
    1,
    Math.ceil(
      totalCriteria / 2
    )
  );
}

export function evaluateCaseAnswer(
  caseData,
  answer
) {
  if (!caseData) {
    return {
      status:
        EVALUATION_STATUS.INCOMPLETE,
      matchedCriteria: [],
      missingCriteria: [],
      score: 0,
      totalCriteria: 0,
      minimumCriteria: 0,
      completed: false
    };
  }

  const cleanAnswer =
    typeof answer === "string"
      ? answer.trim()
      : "";

  const requiredCriteria =
    getRequiredCriteria(
      caseData
    );

  if (!cleanAnswer) {
    return {
      status:
        EVALUATION_STATUS.INCOMPLETE,
      matchedCriteria: [],
      missingCriteria:
        requiredCriteria,
      score: 0,
      totalCriteria:
        requiredCriteria.length,
      minimumCriteria:
        getMinimumCriteria(
          caseData,
          requiredCriteria.length
        ),
      completed: false
    };
  }

  /*
   * Each criterion is checked
   * independently.
   */
  const matchedCriteria =
    requiredCriteria.filter(
      (criterion) =>
        evaluateCriterion(
          cleanAnswer,
          criterion
        )
    );

  const missingCriteria =
    requiredCriteria.filter(
      (criterion) =>
        !matchedCriteria.includes(
          criterion
        )
    );

  const minimumCriteria =
    getMinimumCriteria(
      caseData,
      requiredCriteria.length
    );

  const completed =
    requiredCriteria.length === 0
      ? false
      : matchedCriteria.length >=
        minimumCriteria;

  let status =
    EVALUATION_STATUS.NEEDS_REVIEW;

  if (completed) {
    status =
      EVALUATION_STATUS.CORRECT;
  }

  return {
    status,
    matchedCriteria,
    missingCriteria,
    score:
      matchedCriteria.length,
    totalCriteria:
      requiredCriteria.length,
    minimumCriteria,
    completed
  };
}

export function getFeedback(
  caseData,
  evaluationResult,
  attempt = 1
) {
  if (
    !caseData ||
    !evaluationResult
  ) {
    return {
      type: "hint",
      message:
        "خپل نظر ولیکه او بیا یې ثبت کړه."
    };
  }

  if (
    evaluationResult.completed
  ) {
    return {
      type: "success",
      message:
        "ستاسې نظر د قضیې له مهمو معیارونو سره کافي مطابقت لري."
    };
  }

  const hints =
    caseData.hints || {};

  const safeAttempt =
    Math.max(
      1,
      Math.floor(
        Number(attempt) || 1
      )
    );

  if (
    safeAttempt === 1 &&
    hints.first
  ) {
    return {
      type: "hint",
      message:
        hints.first.pashto ||
        hints.first.dari ||
        hints.first.english ||
        "مهم شواهد او قانوني موضوع بیا وارزوه."
    };
  }

  if (
    safeAttempt === 2 &&
    hints.second
  ) {
    return {
      type: "hint",
      message:
        hints.second.pashto ||
        hints.second.dari ||
        hints.second.english ||
        "د قضیې مهمو ټکو ته لا زیات پام وکړه."
    };
  }

  if (
    safeAttempt >= 3 &&
    hints.third
  ) {
    return {
      type: "guidance",
      message:
        hints.third.pashto ||
        hints.third.dari ||
        hints.third.english ||
        "شواهد، قانوني موضوع او خپل استدلال په منظم ډول بیا وارزوه."
    };
  }

  const missingCount =
    Array.isArray(
      evaluationResult.missingCriteria
    )
      ? evaluationResult
          .missingCriteria.length
      : 0;

  if (missingCount > 0) {
    return {
      type:
        safeAttempt >= 3
          ? "guidance"
          : "hint",
      message:
        safeAttempt >= 3
          ? "د قضیې شواهد، قانوني موضوع، د دواړو خواوو دریځ او خپل وروستی استدلال په منظم ډول سره وتړه."
          : "شواهد، قانوني موضوع او خپل استدلال بیا وارزوه."
    };
  }

  return {
    type: "hint",
    message:
      "خپل قانوني استدلال لا واضح او د شواهدو پر بنسټ ولیکه."
  };
}

export function canCompleteCase(
  caseData,
  answer,
  attempt = 1
) {
  const result =
    evaluateCaseAnswer(
      caseData,
      answer
    );

  const safeAttempt =
    Math.max(
      1,
      Math.floor(
        Number(attempt) || 1
      )
    );

  return {
    ...result,
    attempt: safeAttempt,
    feedback:
      getFeedback(
        caseData,
        result,
        safeAttempt
      )
  };
}

export function getMissingCriteria(
  caseData,
  answer
) {
  const result =
    evaluateCaseAnswer(
      caseData,
      answer
    );

  return result.missingCriteria;
}

export function getMatchedCriteria(
  caseData,
  answer
) {
  const result =
    evaluateCaseAnswer(
      caseData,
      answer
    );

  return result.matchedCriteria;
}