import React from "react";
import { View, StyleSheet, ActivityIndicator, Text } from "react-native";
import { ProfileCard } from "../../features/auth/components/profile-card";
import { useAuthStore } from "../../features/auth/store/use-auth-store";
import { useProfileQuery } from "../../features/auth/hooks/use-profile-query";

export default function ProfileScreen() {
  const storeUser = useAuthStore((state) => state.user);
  const { data: profileUser, isLoading, error } = useProfileQuery();

  // Prefer cached/fresh profile data from TanStack Query, fallback to Zustand store user
  const displayUser = profileUser || storeUser;

  return (
    <View style={styles.container}>
      {isLoading && !displayUser ? (
        <ActivityIndicator size="large" color="#2563eb" />
      ) : displayUser ? (
        <ProfileCard user={displayUser} />
      ) : (
        <Text style={styles.errorText}>
          {error instanceof Error ? error.message : "Failed to load profile data."}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f3f4f6",
    padding: 16,
  },
  errorText: {
    color: "#ef4444",
    fontSize: 15,
  },
});
