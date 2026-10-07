export function normalizeText(value = "") {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

export function normalizeEmail(email = "") {
  return normalizeText(email);
}

export function isDuplicateById(items = [], id) {
  if (!id) return false;

  return items.some(
    (item) => String(item?.id || "") === String(id)
  );
}

export function isDuplicateByField(
  items = [],
  field,
  value
) {
  if (!field || value === undefined || value === null) {
    return false;
  }

  const normalizedValue = normalizeText(value);

  return items.some(
    (item) =>
      normalizeText(item?.[field]) === normalizedValue
  );
}

export function isDuplicateEmail(users = [], email) {
  const normalizedEmail = normalizeEmail(email);

  if (!normalizedEmail) {
    return false;
  }

  return users.some(
    (user) =>
      normalizeEmail(user?.email) === normalizedEmail
  );
}

export function addUniqueById(items = [], newItem) {
  if (!newItem?.id) {
    return {
      items,
      added: false,
      reason: "missing_id"
    };
  }

  if (isDuplicateById(items, newItem.id)) {
    return {
      items,
      added: false,
      reason: "duplicate_id"
    };
  }

  return {
    items: [...items, newItem],
    added: true,
    reason: null
  };
}

export function addUniqueByField(
  items = [],
  newItem,
  field
) {
  if (!newItem?.[field]) {
    return {
      items,
      added: false,
      reason: "missing_field"
    };
  }

  if (
    isDuplicateByField(
      items,
      field,
      newItem[field]
    )
  ) {
    return {
      items,
      added: false,
      reason: "duplicate_field"
    };
  }

  return {
    items: [...items, newItem],
    added: true,
    reason: null
  };
}

export function updateUniqueById(
  items = [],
  updatedItem
) {
  if (!updatedItem?.id) {
    return {
      items,
      updated: false,
      reason: "missing_id"
    };
  }

  const index = items.findIndex(
    (item) =>
      String(item?.id || "") ===
      String(updatedItem.id)
  );

  if (index === -1) {
    return {
      items,
      updated: false,
      reason: "not_found"
    };
  }

  const newItems = [...items];

  newItems[index] = {
    ...newItems[index],
    ...updatedItem
  };

  return {
    items: newItems,
    updated: true,
    reason: null
  };
}

export function removeDuplicatesById(items = []) {
  const seen = new Set();
  const uniqueItems = [];

  for (const item of items) {
    const id = String(item?.id || "");

    if (!id || seen.has(id)) {
      continue;
    }

    seen.add(id);
    uniqueItems.push(item);
  }

  return uniqueItems;
}

export function removeDuplicatesByField(
  items = [],
  field
) {
  const seen = new Set();
  const uniqueItems = [];

  for (const item of items) {
    const value = normalizeText(item?.[field]);

    if (!value || seen.has(value)) {
      continue;
    }

    seen.add(value);
    uniqueItems.push(item);
  }

  return uniqueItems;
}