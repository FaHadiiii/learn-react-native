import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "../domain/auth-schemas";
import { useLoginMutation } from "../hooks/use-login-mutation";
import { Card, TextField, Button } from "../../../core/components";
import { theme } from "../../../core/theme";

export function LoginForm() {
  const loginMutation = useLoginMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "developer@example.com",
      password: "password123",
    },
  });

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  return (
    <Card>
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Sign in to your Clean Architecture app</Text>

      {loginMutation.isError && (
        <View style={styles.errorBanner}>
          <Text style={styles.errorBannerText}>
            {loginMutation.error instanceof Error
              ? loginMutation.error.message
              : "Login failed. Please check your credentials."}
          </Text>
        </View>
      )}

      {/* Email Field using reusable TextField */}
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            label="Email Address"
            placeholder="e.g. user@example.com"
            autoCapitalize="none"
            keyboardType="email-address"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={errors.email?.message}
          />
        )}
      />

      {/* Password Field using reusable TextField */}
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            label="Password"
            placeholder="••••••••"
            secureTextEntry
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={errors.password?.message}
          />
        )}
      />

      {/* Submit Button using reusable Button */}
      <Button
        title="Sign In"
        variant="primary"
        onPress={handleSubmit(onSubmit)}
        isLoading={loginMutation.isPending}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: theme.typography.fontSize.xxl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xl,
  },
  errorBanner: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.danger[50],
    borderColor: theme.colors.danger[200],
    borderWidth: 1,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.lg,
  },
  errorBannerText: {
    color: theme.colors.danger[600],
    fontSize: theme.typography.fontSize.xs,
  },
});
