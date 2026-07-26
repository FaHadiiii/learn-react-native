import React from "react";
import { Redirect, Stack } from "expo-router";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { useAuthStore } from "../../features/auth/store/use-auth-store";

export default function AppLayout() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isInitialized = useAuthStore((state) => state.isInitialized);

  // Show loading indicator while reading tokens from SecureStore on launch
  if (!isInitialized) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  // Auth Guard: Redirect unauthenticated users back to login screen
  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#ffffff" },
        headerTitleStyle: { fontWeight: "bold", color: "#111827" },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="profile" options={{ title: "My Profile" }} />
    </Stack>
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f9fafb",
  },
});
