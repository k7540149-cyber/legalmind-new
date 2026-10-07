import {
  getData,
  saveData
} from "../storage/storage";

import {
  STORAGE_KEYS
} from "../storage/storage";

import {
  createSyncKey,
  uniqueSyncQueue
} from "../utils/syncValidator";

const SYNC_QUEUE_KEY =
  "@legalmind/sync_queue";

const LAST_SYNC_KEY =
  "@legalmind/last_sync";

const APP_NAME = "LegalMind";
const APP_VERSION = "1.0.0";

const ALLOWED_TYPES = [
  "profile",
  "progress",
  "favorites",
  "achievements",
  "settings",
  "full_sync"
];

function cleanType(type) {
  const value =
    String(type || "")
      .trim()
      .toLowerCase();

  return ALLOWED_TYPES.includes(value)
    ? value
    : null;
}

function cleanQueue(queue = []) {
  if (!Array.isArray(queue)) {
    return [];
  }

  return uniqueSyncQueue(
    queue.filter(
      (item) =>
        item &&
        typeof item === "object" &&
        item.type &&
        item.data
    )
  );
}

function createQueueId() {
  return `sync-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 10)}`;
}

export async function getSyncQueue() {
  const queue =
    await getData(
      SYNC_QUEUE_KEY,
      []
    );

  return cleanQueue(queue);
}

export async function addToSyncQueue(
  type,
  data
) {
  const cleanTypeValue =
    cleanType(type);

  if (!cleanTypeValue) {
    return {
      success: false,
      reason: "invalid_sync_type"
    };
  }

  if (
    data === null ||
    data === undefined
  ) {
    return {
      success: false,
      reason: "missing_sync_data"
    };
  }

  const queue =
    await getSyncQueue();

  const syncKey =
    createSyncKey(
      cleanTypeValue,
      data
    );

  const duplicate =
    queue.some(
      (item) =>
        item?.syncKey === syncKey
    );

  if (duplicate) {
    return {
      success: false,
      duplicate: true,
      reason: "duplicate_sync_item",
      item:
        queue.find(
          (item) =>
            item?.syncKey ===
            syncKey
        ) || null
    };
  }

  const item = {
    id: createQueueId(),
    syncKey,
    type: cleanTypeValue,
    data,
    createdAt:
      new Date().toISOString(),
    attempts: 0,
    status: "pending"
  };

  const updatedQueue =
    cleanQueue([
      ...queue,
      item
    ]);

  await saveData(
    SYNC_QUEUE_KEY,
    updatedQueue
  );

  return {
    success: true,
    duplicate: false,
    item,
    queue: updatedQueue
  };
}

export async function getLastSyncTime() {
  return getData(
    LAST_SYNC_KEY,
    null
  );
}

export async function markSyncCompleted() {
  const time =
    new Date().toISOString();

  await saveData(
    LAST_SYNC_KEY,
    time
  );

  await saveData(
    SYNC_QUEUE_KEY,
    []
  );

  return time;
}

export async function collectLocalUserData() {
  const profile =
    await getData(
      STORAGE_KEYS.PROFILE,
      {}
    );

  const progress =
    await getData(
      STORAGE_KEYS.PROGRESS,
      {}
    );

  const favorites =
    await getData(
      STORAGE_KEYS.FAVORITES,
      {}
    );

  const achievements =
    await getData(
      STORAGE_KEYS.ACHIEVEMENTS,
      []
    );

  const settings =
    await getData(
      STORAGE_KEYS.SETTINGS,
      {}
    );

  return {
    profile,
    progress,
    favorites,
    achievements,
    settings,
    collectedAt:
      new Date().toISOString()
  };
}

export async function prepareSyncPayload() {
  const localData =
    await collectLocalUserData();

  return {
    app: APP_NAME,
    version: APP_VERSION,
    deviceData: localData
  };
}

export async function syncWhenOnline() {
  /*
   * Server synchronization
   * will be connected later.
   *
   * The app remains fully usable
   * without internet.
   *
   * Local progress is never deleted
   * when synchronization fails.
   */

  const payload =
    await prepareSyncPayload();

  return {
    success: false,
    offline: true,
    pending: true,
    payload
  };
}

export async function clearSyncQueue() {
  await saveData(
    SYNC_QUEUE_KEY,
    []
  );

  return true;
}

export async function removeSyncItem(
  syncId
) {
  const id =
    String(syncId || "")
      .trim();

  if (!id) {
    return false;
  }

  const queue =
    await getSyncQueue();

  const updatedQueue =
    queue.filter(
      (item) =>
        String(item?.id || "") !== id
    );

  await saveData(
    SYNC_QUEUE_KEY,
    updatedQueue
  );

  return true;
}

export async function markSyncItemFailed(
  syncId
) {
  const id =
    String(syncId || "")
      .trim();

  if (!id) {
    return false;
  }

  const queue =
    await getSyncQueue();

  const updatedQueue =
    queue.map((item) => {
      if (
        String(item?.id || "") !== id
      ) {
        return item;
      }

      return {
        ...item,
        attempts:
          Math.min(
            Number(item.attempts) || 0,
            100
          ) + 1,
        status: "failed",
        lastAttemptAt:
          new Date().toISOString()
      };
    });

  await saveData(
    SYNC_QUEUE_KEY,
    updatedQueue
  );

  return true;
}