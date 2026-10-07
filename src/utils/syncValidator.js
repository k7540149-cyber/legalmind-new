export function createSyncKey(type, id) {
  return `${String(type || "").trim()}:${String(
    id || ""
  ).trim()}`;
}

export function uniqueSyncQueue(queue = []) {
  const seen = new Set();

  return queue.filter((item) => {
    const key =
      item?.syncKey ||
      createSyncKey(item?.type, item?.id);

    if (!key || seen.has(key)) {
      return false;
    }

    seen.add(key);

    return true;
  });
}

export function addToSyncQueue(queue = [], item) {
  if (!item?.type || !item?.id) {
    return uniqueSyncQueue(queue);
  }

  const syncKey = createSyncKey(
    item.type,
    item.id
  );

  const exists = queue.some(
    (entry) =>
      (entry?.syncKey ||
        createSyncKey(entry?.type, entry?.id)) ===
      syncKey
  );

  if (exists) {
    return uniqueSyncQueue(queue);
  }

  return uniqueSyncQueue([
    ...queue,
    {
      ...item,
      syncKey
    }
  ]);
}

export function removeFromSyncQueue(
  queue = [],
  type,
  id
) {
  const syncKey = createSyncKey(type, id);

  return queue.filter(
    (item) =>
      (item?.syncKey ||
        createSyncKey(item?.type, item?.id)) !==
      syncKey
  );
}