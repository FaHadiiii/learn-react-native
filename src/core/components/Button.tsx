import React from "react";
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacityProps,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import { theme } from "../theme";

export type ButtonVariant = "primary" | "secondary" | "danger" | "outline";

export interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: ButtonVariant;
  isLoading?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export function Button({
  title,
  variant = "primary",
  isLoading = false,
  disabled,
  style,
  textStyle,
  ...props
}: ButtonProps) {
  const isButtonDisabled = disabled || isLoading;

  return (
    <TouchableOpacity
      style={[
        styles.baseButton,
        styles[variant],
        isButtonDisabled && styles.disabled,
        style,
      ]}
      disabled={isButtonDisabled}
      activeOpacity={0.8}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator
          color={
            variant === "outline" || variant === "secondary"
              ? theme.colors.primary[600]
              : theme.colors.text.inverse
          }
        />
      ) : (
        <Text
          style={[
            styles.baseText,
            styles[`${variant}Text`],
            textStyle,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  baseButton: {
    height: 48,
    borderRadius: theme.borderRadius.md,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: theme.spacing.lg,
  },
  primary: {
    backgroundColor: theme.colors.primary[600],
  },
  secondary: {
    backgroundColor: theme.colors.neutral[100],
  },
  danger: {
    backgroundColor: theme.colors.danger[500],
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: theme.colors.border.default,
  },
  disabled: {
    opacity: 0.6,
  },
  baseText: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semibold,
  },
  primaryText: {
    color: theme.colors.text.inverse,
  },
  secondaryText: {
    color: theme.colors.neutral[900],
  },
  dangerText: {
    color: theme.colors.text.inverse,
  },
  outlineText: {
    color: theme.colors.neutral[900],
  },
});
