import { uniqueById } from "./uniqueData";

function normalizeId(id) {
  return String(id || "").trim();
}

export function registerContent(
  registry = [],
  item,
  type
) {
  const id = normalizeId(item?.id);

  if (!id || !type) {
    return {
      registry: uniqueById(registry),
      added: false,
      reason: "missing_id_or_type"
    };
  }

  const exists = registry.some(
    (entry) =>
      normalizeId(entry?.id) === id &&
      String(entry?.type || "") === String(type)
  );

  if (exists) {
    return {
      registry: uniqueById(registry),
      added: false,
      reason: "duplicate_content"
    };
  }

  return {
    registry: uniqueById([
      ...registry,
      {
        id,
        type,
        version: 1
      }
    ]),
    added: true,
    reason: null
  };
}

export function hasContent(
  registry = [],
  id,
  type
) {
  const targetId = normalizeId(id);
  const targetType = String(type || "");

  return registry.some(
    (entry) =>
      normalizeId(entry?.id) === targetId &&
      String(entry?.type || "") === targetType
  );
}

export function removeContent(
  registry = [],
  id,
  type
) {
  const targetId = normalizeId(id);
  const targetType = String(type || "");

  return registry.filter(
    (entry) =>
      !(
        normalizeId(entry?.id) === targetId &&
        String(entry?.type || "") === targetType
      )
  );
}

export function getContentCount(
  registry = [],
  type
) {
  return registry.filter(
    (entry) =>
      String(entry?.type || "") === String(type || "")
  ).length;
}

export function cleanContentRegistry(
  registry = []
) {
  const seen = new Set();

  return registry.filter((entry) => {
    const id = normalizeId(entry?.id);
    const type = String(entry?.type || "");

    if (!id || !type) {
      return false;
    }

    const key = `${type}:${id}`;

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}