import {
  normalizeText,
  normalizeEmail
} from "./duplicateProtection";

export function uniqueById(items = []) {
  const seen = new Set();

  return items.filter((item) => {
    const id = String(item?.id || "").trim();

    if (!id || seen.has(id)) {
      return false;
    }

    seen.add(id);
    return true;
  });
}

export function uniqueByText(items = []) {
  const seen = new Set();

  return items.filter((item) => {
    const value = normalizeText(item);

    if (!value || seen.has(value)) {
      return false;
    }

    seen.add(value);
    return true;
  });
}

export function uniqueUsersByEmail(users = []) {
  const seen = new Set();

  return users.filter((user) => {
    const email = normalizeEmail(user?.email);

    if (!email || seen.has(email)) {
      return false;
    }

    seen.add(email);
    return true;
  });
}

export function uniqueByField(items = [], field) {
  const seen = new Set();

  return items.filter((item) => {
    const value = normalizeText(item?.[field]);

    if (!value || seen.has(value)) {
      return false;
    }

    seen.add(value);
    return true;
  });
}

export function mergeUniqueById(
  existing = [],
  incoming = []
) {
  return uniqueById([
    ...existing,
    ...incoming
  ]);
}