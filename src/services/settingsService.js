import {
  getData,
  saveData,
  STORAGE_KEYS
} from "../storage/storage";

import { DEFAULT_SETTINGS } from "../data/appDefaults";

const ALLOWED_LANGUAGES = [
  "pashto",
  "dari",
  "english"
];

const ALLOWED_KEYS = [
  "language",
  "soundEnabled",
  "musicEnabled",
  "vibrationEnabled",
  "notificationsEnabled"
];

function cleanBoolean(
  value,
  fallback = false
) {
  if (typeof value === "boolean") {
    return value;
  }

  return fallback;
}

function cleanLanguage(language) {
  const value =
    String(language || "").trim().toLowerCase();

  return ALLOWED_LANGUAGES.includes(value)
    ? value
    : DEFAULT_SETTINGS.language;
}

function cleanSettings(settings = {}) {
  const defaults = {
    ...DEFAULT_SETTINGS
  };

  return {
    ...defaults,
    ...(settings || {}),
    language: cleanLanguage(
      settings?.language
    ),
    soundEnabled: cleanBoolean(
      settings?.soundEnabled,
      defaults.soundEnabled
    ),
    musicEnabled: cleanBoolean(
      settings?.musicEnabled,
      defaults.musicEnabled
    ),
    vibrationEnabled: cleanBoolean(
      settings?.vibrationEnabled,
      defaults.vibrationEnabled
    ),
    notificationsEnabled: cleanBoolean(
      settings?.notificationsEnabled,
      defaults.notificationsEnabled
    )
  };
}

export async function getSettings() {
  const saved = await getData(
    STORAGE_KEYS.SETTINGS,
    DEFAULT_SETTINGS
  );

  return cleanSettings(saved);
}

export async function saveSettings(
  settings = {}
) {
  const current =
    await getSettings();

  const updated =
    cleanSettings({
      ...current,
      ...settings
    });

  await saveData(
    STORAGE_KEYS.SETTINGS,
    updated
  );

  return updated;
}

export async function updateSetting(
  key,
  value
) {
  const cleanKey =
    String(key || "").trim();

  if (!ALLOWED_KEYS.includes(cleanKey)) {
    return getSettings();
  }

  if (cleanKey === "language") {
    return setLanguage(value);
  }

  if (
    cleanKey === "soundEnabled" ||
    cleanKey === "musicEnabled" ||
    cleanKey === "vibrationEnabled" ||
    cleanKey === "notificationsEnabled"
  ) {
    return saveSettings({
      [cleanKey]: Boolean(value)
    });
  }

  return getSettings();
}

export async function setLanguage(
  language
) {
  const cleanLanguageValue =
    cleanLanguage(language);

  return saveSettings({
    language: cleanLanguageValue
  });
}

export async function toggleSound(
  enabled
) {
  return saveSettings({
    soundEnabled: Boolean(enabled)
  });
}

export async function toggleMusic(
  enabled
) {
  return saveSettings({
    musicEnabled: Boolean(enabled)
  });
}

export async function toggleVibration(
  enabled
) {
  return saveSettings({
    vibrationEnabled: Boolean(enabled)
  });
}

export async function toggleNotifications(
  enabled
) {
  return saveSettings({
    notificationsEnabled:
      Boolean(enabled)
  });
}

export async function resetSettings() {
  const cleanDefaults =
    cleanSettings(
      DEFAULT_SETTINGS
    );

  await saveData(
    STORAGE_KEYS.SETTINGS,
    cleanDefaults
  );

  return cleanDefaults;
}