import {
  getData,
  saveData,
  STORAGE_KEYS
} from "../storage/storage";

import { DEFAULT_SETTINGS } from "../data/appDefaults";

export async function getSettings() {
  const saved = await getData(
    STORAGE_KEYS.SETTINGS,
    DEFAULT_SETTINGS
  );

  return {
    ...DEFAULT_SETTINGS,
    ...(saved || {})
  };
}

export async function saveSettings(settings = {}) {
  const current = await getSettings();

  const updated = {
    ...current,
    ...settings
  };

  await saveData(
    STORAGE_KEYS.SETTINGS,
    updated
  );

  return updated;
}

export async function updateSetting(key, value) {
  const settings = await getSettings();

  const updated = {
    ...settings,
    [key]: value
  };

  await saveData(
    STORAGE_KEYS.SETTINGS,
    updated
  );

  return updated;
}

export async function setLanguage(language) {
  return updateSetting("language", language);
}

export async function toggleSound(enabled) {
  return updateSetting("soundEnabled", Boolean(enabled));
}

export async function toggleMusic(enabled) {
  return updateSetting("musicEnabled", Boolean(enabled));
}

export async function toggleVibration(enabled) {
  return updateSetting(
    "vibrationEnabled",
    Boolean(enabled)
  );
}

export async function toggleNotifications(enabled) {
  return updateSetting(
    "notificationsEnabled",
    Boolean(enabled)
  );
}

export async function resetSettings() {
  await saveData(
    STORAGE_KEYS.SETTINGS,
    DEFAULT_SETTINGS
  );

  return DEFAULT_SETTINGS;
}