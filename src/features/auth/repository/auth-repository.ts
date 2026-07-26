import { secureStorage, STORAGE_KEYS } from "../../../core/storage/secure-storage";
import { authApi } from "../api/auth-api";
import { UserDto } from "../api/auth-dto";
import { LoginFormData } from "../domain/auth-schemas";
import { AuthTokens, User, UserRole } from "../domain/auth-types";

/**
 * Mapper Functions: Data (DTO) <-> Domain
 * Keeps UI and domain logic clean and independent of backend API schema changes.
 */
export function mapUserDtoToDomain(dto: UserDto): User {
  return {
    id: dto.user_id,
    email: dto.email_addr,
    fullName: dto.display_name,
    avatarUrl: dto.profile_image,
    role: (dto.account_role as UserRole) || "user",
    createdAt: dto.created_at_timestamp,
  };
}

/**
 * Auth Repository Object
 * Single source of truth for Auth operations combining API calls, DTO mapping, and storage persistence.
 */
export const authRepository = {
  async login(credentials: LoginFormData): Promise<{ user: User; tokens: AuthTokens }> {
    // 1. Call raw API
    const responseDto = await authApi.login({
      email_address: credentials.email,
      user_password: credentials.password,
    });

    // 2. Map DTO to Domain entities
    const user = mapUserDtoToDomain(responseDto.user);
    const tokens: AuthTokens = {
      accessToken: responseDto.access_token,
      refreshToken: responseDto.refresh_token,
    };

    // 3. Persist sensitive tokens securely
    await secureStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, tokens.accessToken);
    await secureStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, tokens.refreshToken);

    return { user, tokens };
  },

  async getUserProfile(): Promise<User> {
    const userDto = await authApi.getProfile();
    return mapUserDtoToDomain(userDto);
  },

  async logout(): Promise<void> {
    await secureStorage.clearAuthTokens();
  },

  async getStoredAccessToken(): Promise<string | null> {
    return secureStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  },
};
