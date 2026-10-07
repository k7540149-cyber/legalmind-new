export function isValidRequiredText(value) {
  return (
    typeof value === "string" &&
    value.trim().length > 0
  );
}

export function isValidEmail(email) {
  if (typeof email !== "string") {
    return false;
  }

  const value = email.trim().toLowerCase();

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function normalizeName(value = "") {
  return String(value)
    .trim()
    .replace(/\s+/g, " ");
}

export function validateProfile({
  name = "",
  surname = "",
  email = ""
}) {
  const errors = {};

  const cleanName = normalizeName(name);
  const cleanSurname = normalizeName(surname);
  const cleanEmail = email.trim().toLowerCase();

  if (!isValidRequiredText(cleanName)) {
    errors.name = "نوم ضروري دی.";
  }

  if (!isValidRequiredText(cleanSurname)) {
    errors.surname = "تخلص ضروري دی.";
  }

  if (!isValidEmail(cleanEmail)) {
    errors.email = "سم Email وليکئ.";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    data: {
      name: cleanName,
      surname: cleanSurname,
      email: cleanEmail
    }
  };
}

export function hasDuplicateId(items = [], id) {
  if (!id) return false;

  return items.filter(
    (item) =>
      String(item?.id || "") === String(id)
  ).length > 1;
}

export function findDuplicateValues(
  items = [],
  field
) {
  const counts = {};

  for (const item of items) {
    const value = String(item?.[field] || "")
      .trim()
      .toLowerCase();

    if (!value) continue;

    counts[value] = (counts[value] || 0) + 1;
  }

  return Object.keys(counts).filter(
    (value) => counts[value] > 1
  );
}