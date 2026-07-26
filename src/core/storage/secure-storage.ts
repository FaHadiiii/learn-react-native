import * as SecureStore from "expo-secure-store";

/**
 * Secure Storage abstraction wrapper over expo-secure-store.
 * Use ONLY for sensitive information like auth tokens, refresh tokens, and API keys.
 */
export const STORAGE_KEYS = {
  ACCESS_TOKEN: "auth_access_token",
  REFRESH_TOKEN: "auth_refresh_token",
} as const;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];

export const secureStorage = {
  async getItem(key: StorageKey): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (error) {
      console.error(`Error reading secure key "${key}":`, error);
      return null;
    }
  },

  async setItem(key: StorageKey, value: string): Promise<void> {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (error) {
      console.error(`Error writing secure key "${key}":`, error);
      throw error;
    }
  },

  async removeItem(key: StorageKey): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch (error) {
      console.error(`Error deleting secure key "${key}":`, error);
    }
  },

  async clearAuthTokens(): Promise<void> {
    await Promise.all([
      this.removeItem(STORAGE_KEYS.ACCESS_TOKEN),
      this.removeItem(STORAGE_KEYS.REFRESH_TOKEN),
    ]);
  },
};
