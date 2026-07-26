import { create } from "zustand";
import { User } from "../domain/auth-types";
import { authRepository } from "../repository/auth-repository";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isInitialized: boolean;

  // Actions
  setSession: (user: User) => void;
  clearSession: () => void;
  initializeAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isInitialized: false,

  setSession: (user: User) =>
    set({
      user,
      isAuthenticated: true,
    }),

  clearSession: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),

  initializeAuth: async () => {
    try {
      const token = await authRepository.getStoredAccessToken();
      if (token) {
        // Hydrate session if access token exists
        const user = await authRepository.getUserProfile();
        set({ user, isAuthenticated: true, isInitialized: true });
      } else {
        set({ user: null, isAuthenticated: false, isInitialized: true });
      }
    } catch (error) {
      console.warn("Failed to restore auth session:", error);
      await authRepository.logout();
      set({ user: null, isAuthenticated: false, isInitialized: true });
    }
  },
}));
