import { Stack } from "expo-router";
import { useEffect } from "react";
import { QueryProvider } from "../core/providers/query-provider";
import { useAuthStore } from "../features/auth/store/use-auth-store";

function AppContent() {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  useEffect(() => {
    // Hydrate auth session from secure storage on app launch
    initializeAuth();
  }, [initializeAuth]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(app)" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <QueryProvider>
      <AppContent />
    </QueryProvider>
  );
}
