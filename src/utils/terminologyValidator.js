import { terminology } from "../data/terminology";

function normalizeText(value = "") {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

function getTermKey(term) {
  if (!term) return "";

  return normalizeText(
    term.term ||
    term.pashto?.term ||
    term.dari?.term ||
    term.english?.term ||
    ""
  );
}

export function validateTerminology(data = terminology) {
  const source = Array.isArray(data) ? data : [];

  const seenIds = new Set();
  const seenTerms = new Set();

  const validTerms = [];
  const duplicateIds = [];
  const duplicateTerms = [];
  const invalidTerms = [];

  source.forEach((item) => {
    if (!item || typeof item !== "object") {
      invalidTerms.push(item);
      return;
    }

    const id = normalizeText(item.id);
    const termKey = getTermKey(item);

    if (!id || !termKey) {
      invalidTerms.push(item);
      return;
    }

    if (seenIds.has(id)) {
      duplicateIds.push(id);
      return;
    }

    if (seenTerms.has(termKey)) {
      duplicateTerms.push(termKey);
      return;
    }

    seenIds.add(id);
    seenTerms.add(termKey);

    validTerms.push(item);
  });

  return {
    validTerms,
    duplicateIds: [...new Set(duplicateIds)],
    duplicateTerms: [...new Set(duplicateTerms)],
    invalidTerms,
    total: source.length,
    valid: validTerms.length,
  };
}

export function getUniqueTerminology(data = terminology) {
  return validateTerminology(data).validTerms;
}

export function hasDuplicateTerminology(data = terminology) {
  const result = validateTerminology(data);

  return (
    result.duplicateIds.length > 0 ||
    result.duplicateTerms.length > 0 ||
    result.invalidTerms.length > 0
  );
}

export function findDuplicateTerminology(data = terminology) {
  const result = validateTerminology(data);

  return {
    duplicateIds: result.duplicateIds,
    duplicateTerms: result.duplicateTerms,
    invalidTerms: result.invalidTerms,
  };
}

export function findTermByNormalizedName(
  termName,
  data = terminology
) {
  const target = normalizeText(termName);

  if (!target) return null;

  return getUniqueTerminology(data).find((item) => {
    const keys = [
      item.term,
      item.pashto?.term,
      item.dari?.term,
      item.english?.term,
    ];

    return keys.some(
      (value) => normalizeText(value) === target
    );
  }) || null;
}