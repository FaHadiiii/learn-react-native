/**
 * Domain Entities
 * Represent the pure business models of the application (decoupled from backend DTO formats).
 */

export type UserRole = "user" | "admin";

export interface User {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  role: UserRole;
  createdAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthSession {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
}
