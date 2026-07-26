import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Non-sensitive local storage wrapper over AsyncStorage.
 * Use for non-sensitive data such as UI preferences, theme selection, or onboarding state.
 */
export const APP_PREF_KEYS = {
  THEME: "app_theme",
  ONBOARDING_COMPLETED: "onboarding_completed",
} as const;

export type AppPrefKey = (typeof APP_PREF_KEYS)[keyof typeof APP_PREF_KEYS];

export const appStorage = {
  async getItem<T>(key: AppPrefKey): Promise<T | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? (JSON.parse(jsonValue) as T) : null;
    } catch (error) {
      console.error(`Error reading storage key "${key}":`, error);
      return null;
    }
  },

  async setItem<T>(key: AppPrefKey, value: T): Promise<void> {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error(`Error writing storage key "${key}":`, error);
      throw error;
    }
  },

  async removeItem(key: AppPrefKey): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Error deleting storage key "${key}":`, error);
    }
  },
};
