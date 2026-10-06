export const ROLES = {
  JUDGE: "judge",
  PROSECUTOR: "prosecutor",
  DEFENSE: "defense"
};

export const ROLE_CONFIG = {
  judge: {
    id: "judge",
    icon: "👨‍⚖️",
    pashto: "قاضي",
    dari: "قاضی",
    english: "Judge",
    firstCaseId: "case-judge-001",
    tasks: [
      "readCase",
      "inspectPeople",
      "evaluateEvidence",
      "identifyLegalIssue",
      "writeAnalysis",
      "makeDecision",
      "provideReasoning"
    ]
  },

  prosecutor: {
    id: "prosecutor",
    icon: "⚖️",
    pashto: "څارنوال",
    dari: "څارنوال",
    english: "Prosecutor",
    firstCaseId: "case-prosecutor-001",
    tasks: [
      "readCase",
      "assessStatements",
      "analyzeEvidence",
      "identifyCrime",
      "buildProofArgument",
      "submitLegalOpinion",
      "chooseProsecutionOutcome"
    ]
  },

  defense: {
    id: "defense",
    icon: "👨‍💼",
    pashto: "مدافع وکیل",
    dari: "وکیل مدافع",
    english: "Defense Attorney",
    firstCaseId: "case-defense-001",
    tasks: [
      "readCase",
      "inspectClientStatements",
      "examineEvidence",
      "identifyWeakPoints",
      "buildDefense",
      "submitLegalOpinion",
      "presentFinalDefense"
    ]
  }
};

export const ROLE_ORDER = [
  ROLES.JUDGE,
  ROLES.PROSECUTOR,
  ROLES.DEFENSE
];

export function getRoleConfig(roleId) {
  return ROLE_CONFIG[roleId] || null;
}