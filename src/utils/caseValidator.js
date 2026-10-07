import { uniqueById, uniqueByField } from "./uniqueData";

export function validateCases(cases = []) {
  const errors = [];

  if (!Array.isArray(cases)) {
    return {
      valid: false,
      errors: ["Cases باید Array وي."]
    };
  }

  const cleanCases = uniqueById(cases);

  if (cleanCases.length !== cases.length) {
    errors.push("Duplicate Case ID وموندل شول.");
  }

  const titles = cleanCases.map((item) => ({
    id: item?.id,
    title: item?.title
  }));

  const uniqueTitles = uniqueByField(
    titles,
    "title"
  );

  if (uniqueTitles.length !== titles.length) {
    errors.push("Duplicate Case titles وموندل شول.");
  }

  for (const caseItem of cleanCases) {
    if (!caseItem?.id) {
      errors.push("یو Case د ID پرته دی.");
    }

    if (!caseItem?.title) {
      errors.push(
        `Case ${caseItem?.id || "Unknown"} عنوان نه لري.`
      );
    }

    if (!caseItem?.story) {
      errors.push(
        `Case ${caseItem?.id || "Unknown"} story نه لري.`
      );
    }

    if (!caseItem?.difficulty) {
      errors.push(
        `Case ${caseItem?.id || "Unknown"} difficulty نه لري.`
      );
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    cases: cleanCases
  };
}

export function findDuplicateCaseIds(cases = []) {
  const counts = {};

  for (const item of cases) {
    const id = String(item?.id || "").trim();

    if (!id) continue;

    counts[id] = (counts[id] || 0) + 1;
  }

  return Object.keys(counts).filter(
    (id) => counts[id] > 1
  );
}

export function findDuplicateCaseTitles(cases = []) {
  const counts = {};

  for (const item of cases) {
    const title = String(item?.title || "")
      .trim()
      .toLowerCase();

    if (!title) continue;

    counts[title] = (counts[title] || 0) + 1;
  }

  return Object.keys(counts).filter(
    (title) => counts[title] > 1
  );
}