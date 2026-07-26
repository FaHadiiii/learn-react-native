import { useMutation } from "@tanstack/react-query";
import { LoginFormData } from "../domain/auth-schemas";
import { authRepository } from "../repository/auth-repository";
import { useAuthStore } from "../store/use-auth-store";

export function useLoginMutation() {
  const setSession = useAuthStore((state) => state.setSession);

  return useMutation({
    mutationFn: async (credentials: LoginFormData) => {
      return await authRepository.login(credentials);
    },
    onSuccess: (data) => {
      // Update global Zustand store with logged-in user
      setSession(data.user);
    },
  });
}
