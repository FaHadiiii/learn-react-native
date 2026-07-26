import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { User } from "../domain/auth-types";
import { authRepository } from "../repository/auth-repository";
import { useAuthStore } from "../store/use-auth-store";
import { Card, Button } from "../../../core/components";
import { theme } from "../../../core/theme";

interface ProfileCardProps {
  user: User;
}

export function ProfileCard({ user }: ProfileCardProps) {
  const clearSession = useAuthStore((state) => state.clearSession);

  const handleLogout = async () => {
    await authRepository.logout();
    clearSession();
  };

  return (
    <Card style={styles.cardContainer}>
      <View style={styles.avatarContainer}>
        {user.avatarUrl ? (
          <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>
              {user.fullName.charAt(0).toUpperCase()}
            </Text>
          </View>
        )}
      </View>

      <Text style={styles.name}>{user.fullName}</Text>
      <Text style={styles.email}>{user.email}</Text>

      <View style={styles.badge}>
        <Text style={styles.badgeText}>Role: {user.role.toUpperCase()}</Text>
      </View>

      <View style={styles.infoGroup}>
        <Text style={styles.infoLabel}>User ID:</Text>
        <Text style={styles.infoValue}>{user.id}</Text>
      </View>

      <Button
        title="Sign Out"
        variant="danger"
        onPress={handleLogout}
        style={styles.fullWidth}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: "center",
  },
  avatarContainer: {
    marginBottom: theme.spacing.lg,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: theme.borderRadius.full,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.primary[600],
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: theme.typography.fontSize.xxxl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.inverse,
  },
  name: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  email: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.md,
  },
  badge: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    backgroundColor: theme.colors.primary[50],
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.xl,
  },
  badgeText: {
    fontSize: theme.typography.fontSize.xs,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.primary[600],
  },
  infoGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: theme.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: theme.colors.neutral[100],
    marginBottom: theme.spacing.xl,
  },
  infoLabel: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.text.secondary,
  },
  infoValue: {
    fontSize: theme.typography.fontSize.xs,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.neutral[700],
  },
  fullWidth: {
    width: "100%",
  },
});
