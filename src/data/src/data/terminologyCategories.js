export const TERMINOLOGY_CATEGORIES = {
  GENERAL_LAW: "general_law",
  CRIMINAL_LAW: "criminal_law",
  CIVIL_LAW: "civil_law",
  PROCEDURE: "procedure",
  COURT: "court",
  EVIDENCE: "evidence",
  CONTRACT: "contract",
  LEGAL_PROFESSION: "legal_profession",
  CONSTITUTIONAL: "constitutional",
  ADMINISTRATIVE: "administrative",
};

export const TERMINOLOGY_CATEGORY_LABELS = {
  general_law: {
    ps: "عمومي حقوق",
    fa: "حقوق عمومی",
    en: "General Law",
  },

  criminal_law: {
    ps: "جزايي حقوق",
    fa: "حقوق جزا",
    en: "Criminal Law",
  },

  civil_law: {
    ps: "مدني حقوق",
    fa: "حقوق مدنی",
    en: "Civil Law",
  },

  procedure: {
    ps: "دعوایي او اجراآتو حقوق",
    fa: "حقوق دعوا و اجراآت",
    en: "Procedural Law",
  },

  court: {
    ps: "محکمه او قضايي اصطلاحات",
    fa: "اصطلاحات محکمه و قضایی",
    en: "Court & Judicial Terms",
  },

  evidence: {
    ps: "د اثبات او دلایلو اصطلاحات",
    fa: "اصطلاحات اثبات و ادله",
    en: "Evidence",
  },

  contract: {
    ps: "قراردادي حقوق",
    fa: "حقوق قراردادها",
    en: "Contract Law",
  },

  legal_profession: {
    ps: "حقوقي مسلکونه",
    fa: "مسلک‌های حقوقی",
    en: "Legal Professions",
  },

  constitutional: {
    ps: "اساسي حقوق",
    fa: "حقوق اساسی",
    en: "Constitutional Law",
  },

  administrative: {
    ps: "اداري حقوق",
    fa: "حقوق اداری",
    en: "Administrative Law",
  },
};

export function getCategoryLabel(category, language = "ps") {
  return (
    TERMINOLOGY_CATEGORY_LABELS?.[category]?.[language] ||
    TERMINOLOGY_CATEGORY_LABELS?.general_law?.[language] ||
    category
  );
}

export function getAllTerminologyCategories() {
  return Object.keys(TERMINOLOGY_CATEGORIES).map((key) => ({
    id: TERMINOLOGY_CATEGORIES[key],
    label: TERMINOLOGY_CATEGORY_LABELS[
      TERMINOLOGY_CATEGORIES[key]
    ],
  }));
}