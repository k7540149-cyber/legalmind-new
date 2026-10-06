import {
  getData,
  saveData,
  removeData,
  STORAGE_KEYS
} from "../storage/storage";

import { DEFAULT_PROFILE } from "../data/appDefaults";

export async function getProfile() {
  const profile = await getData(
    STORAGE_KEYS.PROFILE,
    DEFAULT_PROFILE
  );

  return {
    ...DEFAULT_PROFILE,
    ...(profile || {})
  };
}

export async function saveProfile({
  name = "",
  surname = "",
  email = ""
}) {
  const profile = {
    name: name.trim(),
    surname: surname.trim(),
    email: email.trim().toLowerCase()
  };

  await saveData(STORAGE_KEYS.PROFILE, profile);

  return profile;
}

export async function updateProfile(changes = {}) {
  const currentProfile = await getProfile();

  const updatedProfile = {
    ...currentProfile,
    ...changes
  };

  updatedProfile.name =
    typeof updatedProfile.name === "string"
      ? updatedProfile.name.trim()
      : "";

  updatedProfile.surname =
    typeof updatedProfile.surname === "string"
      ? updatedProfile.surname.trim()
      : "";

  updatedProfile.email =
    typeof updatedProfile.email === "string"
      ? updatedProfile.email.trim().toLowerCase()
      : "";

  await saveData(
    STORAGE_KEYS.PROFILE,
    updatedProfile
  );

  return updatedProfile;
}

export function validateProfile(profile = {}) {
  const errors = {};

  if (!profile.name?.trim()) {
    errors.name = "نوم اړین دی.";
  }

  if (!profile.surname?.trim()) {
    errors.surname = "تخلص اړین دی.";
  }

  if (!profile.email?.trim()) {
    errors.email = "ایمیل اړین دی.";
  } else if (!isValidEmail(profile.email)) {
    errors.email = "د ایمیل بڼه سمه نه ده.";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
}

export function isValidEmail(email = "") {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    email.trim()
  );
}

export async function isSetupComplete() {
  const value = await getData(
    STORAGE_KEYS.SETUP_COMPLETE,
    false
  );

  return value === true;
}

export async function completeSetup(profile) {
  const validation = validateProfile(profile);

  if (!validation.valid) {
    return {
      success: false,
      errors: validation.errors
    };
  }

  await saveProfile(profile);

  await saveData(
    STORAGE_KEYS.SETUP_COMPLETE,
    true
  );

  return {
    success: true,
    profile: await getProfile()
  };
}

export async function resetProfile() {
  await removeData(STORAGE_KEYS.PROFILE);
  await removeData(STORAGE_KEYS.SETUP_COMPLETE);

  return DEFAULT_PROFILE;
}