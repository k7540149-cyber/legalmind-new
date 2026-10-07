import {
  uniqueById,
  uniqueByField
} from "./uniqueData";

export function validateTerminology(terms = []) {
  const errors = [];

  if (!Array.isArray(terms)) {
    return {
      valid: false,
      errors: ["Terminology باید Array وي."],
      terms: []
    };
  }

  const cleanTerms = uniqueById(terms);

  if (cleanTerms.length !== terms.length) {
    errors.push("Duplicate Terminology IDs وموندل شول.");
  }

  const uniqueEnglish = uniqueByField(
    cleanTerms,
    "english"
  );

  if (uniqueEnglish.length !== cleanTerms.length) {
    errors.push("Duplicate English terminology وموندل شول.");
  }

  for (const term of cleanTerms) {
    if (!term?.id) {
      errors.push("یو Term د ID پرته دی.");
    }

    if (!term?.pashto && !term?.dari && !term?.english) {
      errors.push(
        `Term ${term?.id || "Unknown"} محتوا نه لري.`
      );
    }

    if (!term?.definition) {
      errors.push(
        `Term ${term?.id || "Unknown"} تعریف نه لري.`
      );
    }

    if (!term?.explanation) {
      errors.push(
        `Term ${term?.id || "Unknown"} ساده تشریح نه لري.`
      );
    }

    if (!term?.example) {
      errors.push(
        `Term ${term?.id || "Unknown"} مثال نه لري.`
      );
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    terms: cleanTerms
  };
}

export function findDuplicateTermIds(terms = []) {
  const counts = {};

  for (const term of terms) {
    const id = String(term?.id || "").trim();

    if (!id) continue;

    counts[id] = (counts[id] || 0) + 1;
  }

  return Object.keys(counts).filter(
    (id) => counts[id] > 1
  );
}