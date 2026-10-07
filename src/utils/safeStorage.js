import AsyncStorage from "@react-native-async-storage/async-storage";

export async function safeGet(key, defaultValue = null) {
  try {
    const value = await AsyncStorage.getItem(key);

    if (value === null) {
      return defaultValue;
    }

    return JSON.parse(value);
  } catch (error) {
    console.error("LegalMind safeGet error:", error);
    return defaultValue;
  }
}

export async function safeSet(key, value) {
  try {
    await AsyncStorage.setItem(
      key,
      JSON.stringify(value)
    );

    return true;
  } catch (error) {
    console.error("LegalMind safeSet error:", error);
    return false;
  }
}

export async function safeRemove(key) {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error("LegalMind safeRemove error:", error);
    return false;
  }
}

export async function safeHas(key) {
  try {
    const value = await AsyncStorage.getItem(key);
    return value !== null;
  } catch (error) {
    console.error("LegalMind safeHas error:", error);
    return false;
  }
}

export async function safeGetMultiple(keys = []) {
  try {
    const result = {};

    const entries =
      await AsyncStorage.multiGet(keys);

    for (const [key, value] of entries) {
      if (value === null) {
        result[key] = null;
        continue;
      }

      try {
        result[key] = JSON.parse(value);
      } catch {
        result[key] = value;
      }
    }

    return result;
  } catch (error) {
    console.error(
      "LegalMind safeGetMultiple error:",
      error
    );

    return {};
  }
}