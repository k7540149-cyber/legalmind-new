import {
  getData,
  saveData,
  removeData,
  STORAGE_KEYS
} from "../storage/storage";

import { DEFAULT_PROFILE } from "../data/appDefaults";

import {
  normalizeEmail
} from "../utils/duplicateProtection";

function cleanText(value = "") {
  return typeof value === "string"
    ? value.trim()
    : "";
}

function cleanProfile(profile = {}) {
  return {
    ...DEFAULT_PROFILE,
    ...(profile || {}),
    name: cleanText(profile?.name),
    surname: cleanText(profile?.surname),
    email: normalizeEmail(
      profile?.email
    )
  };
}

export async function getProfile() {
  const profile = await getData(
    STORAGE_KEYS.PROFILE,
    DEFAULT_PROFILE
  );

  return cleanProfile(profile);
}

export async function saveProfile({
  name = "",
  surname = "",
  email = ""
}) {
  const profile = cleanProfile({
    name,
    surname,
    email
  });

  const validation =
    validateProfile(profile);

  if (!validation.valid) {
    return {
      success: false,
      errors: validation.errors,
      profile
    };
  }

  await saveData(
    STORAGE_KEYS.PROFILE,
    profile
  );

  return {
    success: true,
    profile
  };
}

export async function updateProfile(
  changes = {}
) {
  const currentProfile =
    await getProfile();

  const updatedProfile =
    cleanProfile({
      ...currentProfile,
      ...changes
    });

  const validation =
    validateProfile(updatedProfile);

  if (!validation.valid) {
    return {
      success: false,
      errors: validation.errors,
      profile: updatedProfile
    };
  }

  await saveData(
    STORAGE_KEYS.PROFILE,
    updatedProfile
  );

  return {
    success: true,
    profile: updatedProfile
  };
}

export function validateProfile(
  profile = {}
) {
  const errors = {};

  const name =
    cleanText(profile.name);

  const surname =
    cleanText(profile.surname);

  const email =
    normalizeEmail(profile.email);

  if (!name) {
    errors.name =
      "نوم اړین دی.";
  }

  if (!surname) {
    errors.surname =
      "تخلص اړین دی.";
  }

  if (!email) {
    errors.email =
      "ایمیل اړین دی.";
  } else if (
    !isValidEmail(email)
  ) {
    errors.email =
      "د ایمیل بڼه سمه نه ده.";
  }

  return {
    valid:
      Object.keys(errors).length === 0,
    errors
  };
}

export function isValidEmail(
  email = ""
) {
  const value =
    normalizeEmail(email);

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    value
  );
}

export async function isSetupComplete() {
  const profile =
    await getProfile();

  const setupFlag =
    await getData(
      STORAGE_KEYS.SETUP_COMPLETE,
      false
    );

  const profileValid =
    validateProfile(profile).valid;

  return (
    setupFlag === true &&
    profileValid
  );
}

export async function completeSetup(
  profile
) {
  const cleanProfileData =
    cleanProfile(profile);

  const validation =
    validateProfile(
      cleanProfileData
    );

  if (!validation.valid) {
    return {
      success: false,
      errors: validation.errors,
      profile: cleanProfileData
    };
  }

  await saveData(
    STORAGE_KEYS.PROFILE,
    cleanProfileData
  );

  await saveData(
    STORAGE_KEYS.SETUP_COMPLETE,
    true
  );

  return {
    success: true,
    profile:
      await getProfile()
  };
}

export async function resetProfile() {
  await removeData(
    STORAGE_KEYS.PROFILE
  );

  await removeData(
    STORAGE_KEYS.SETUP_COMPLETE
  );

  return {
    ...DEFAULT_PROFILE
  };
}