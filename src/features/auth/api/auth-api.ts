import { apiClient } from "../../../core/api/client";
import { LoginRequestDto, LoginResponseDto, UserDto } from "./auth-dto";

/**
 * Auth API Service
 * Handles raw HTTP requests to the auth endpoints.
 */
export const authApi = {
  /**
   * Post login credentials to auth endpoint.
   * Includes mock fallback for local learning/testing.
   */
  async login(payload: LoginRequestDto): Promise<LoginResponseDto> {
    try {
      const response = await apiClient.post<LoginResponseDto>("/auth/login", payload);
      return response.data;
    } catch (error) {
      // Mock API fallback if backend server is not available
      if (process.env.NODE_ENV !== "production") {
        console.warn("API request failed. Falling back to mock authentication response.");
        await new Promise((resolve) => setTimeout(resolve, 800)); // Simulate network latency

        if (payload.email_address === "error@example.com") {
          throw new Error("Invalid email or password");
        }

        return {
          access_token: "mock_jwt_access_token_" + Date.now(),
          refresh_token: "mock_jwt_refresh_token_" + Date.now(),
          user: {
            user_id: "usr_101",
            email_addr: payload.email_address,
            display_name: payload.email_address.split("@")[0] || "React Native Dev",
            profile_image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
            account_role: "user",
            created_at_timestamp: new Date().toISOString(),
          },
        };
      }
      throw error;
    }
  },

  /**
   * Fetch profile data for the authenticated user.
   */
  async getProfile(): Promise<UserDto> {
    try {
      const response = await apiClient.get<UserDto>("/auth/me");
      return response.data;
    } catch (error) {
      if (process.env.NODE_ENV !== "production") {
        await new Promise((resolve) => setTimeout(resolve, 500));
        return {
          user_id: "usr_101",
          email_addr: "developer@reactnative.dev",
          display_name: "React Native Explorer",
          profile_image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
          account_role: "user",
          created_at_timestamp: new Date().toISOString(),
        };
      }
      throw error;
    }
  },
};
