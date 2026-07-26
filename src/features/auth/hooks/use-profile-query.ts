import { useQuery } from "@tanstack/react-query";
import { authRepository } from "../repository/auth-repository";
import { useAuthStore } from "../store/use-auth-store";

export const AUTH_QUERY_KEYS = {
  PROFILE: ["auth", "profile"] as const,
};

export function useProfileQuery() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return useQuery({
    queryKey: AUTH_QUERY_KEYS.PROFILE,
    queryFn: () => authRepository.getUserProfile(),
    enabled: isAuthenticated, // Only execute fetch when user is authenticated
  });
}
