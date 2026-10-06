import AsyncStorage from "@react-native-async-storage/async-storage";

export const STORAGE_KEYS = {
  PROFILE: "@legalmind/profile",
  SETUP_COMPLETE: "@legalmind/setup_complete",
  PROGRESS: "@legalmind/progress",
  FAVORITES: "@legalmind/favorites",
  ACHIEVEMENTS: "@legalmind/achievements",
  SETTINGS: "@legalmind/settings",
  CASES: "@legalmind/cases"
};

export async function saveData(key, value) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error("LegalMind save error:", error);
    return false;
  }
}

export async function getData(key, defaultValue = null) {
  try {
    const value = await AsyncStorage.getItem(key);

    if (value === null) {
      return defaultValue;
    }

    return JSON.parse(value);
  } catch (error) {
    console.error("LegalMind read error:", error);
    return defaultValue;
  }
}

export async function removeData(key) {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error("LegalMind remove error:", error);
    return false;
  }
}

export async function clearAllLegalMindData() {
  try {
    await AsyncStorage.multiRemove(Object.values(STORAGE_KEYS));
    return true;
  } catch (error) {
    console.error("LegalMind clear error:", error);
    return false;
  }
}