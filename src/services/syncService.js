import {
  getData,
  saveData
} from "../storage/storage";

import {
  STORAGE_KEYS
} from "../storage/storage";

const SYNC_QUEUE_KEY = "@legalmind/sync_queue";
const LAST_SYNC_KEY = "@legalmind/last_sync";

export async function getSyncQueue() {
  const queue = await getData(
    SYNC_QUEUE_KEY,
    []
  );

  return Array.isArray(queue) ? queue : [];
}

export async function addToSyncQueue(type, data) {
  const queue = await getSyncQueue();

  const item = {
    id: `${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 10)}`,
    type,
    data,
    createdAt: new Date().toISOString()
  };

  queue.push(item);

  await saveData(
    SYNC_QUEUE_KEY,
    queue
  );

  return item;
}

export async function getLastSyncTime() {
  return getData(
    LAST_SYNC_KEY,
    null
  );
}

export async function markSyncCompleted() {
  const time = new Date().toISOString();

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
  const profile = await getData(
    STORAGE_KEYS.PROFILE,
    {}
  );

  const progress = await getData(
    STORAGE_KEYS.PROGRESS,
    {}
  );

  const favorites = await getData(
    STORAGE_KEYS.FAVORITES,
    {}
  );

  const achievements = await getData(
    STORAGE_KEYS.ACHIEVEMENTS,
    []
  );

  const settings = await getData(
    STORAGE_KEYS.SETTINGS,
    {}
  );

  return {
    profile,
    progress,
    favorites,
    achievements,
    settings,
    syncedAt: new Date().toISOString()
  };
}

export async function prepareSyncPayload() {
  const localData =
    await collectLocalUserData();

  return {
    app: "LegalMind",
    version: "1.0.0",
    deviceData: localData
  };
}

export async function syncWhenOnline() {
  /*
   * Server connection will be added later.
   *
   * Important:
   * The app remains fully usable offline.
   * No local progress is deleted if synchronization fails.
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