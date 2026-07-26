import React, { forwardRef } from "react";
import {
  View,
  Text,
  TextInput,
  TextInputProps,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import { theme } from "../theme";

export interface TextFieldProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

export const TextField = forwardRef<TextInput, TextFieldProps>(
  ({ label, error, containerStyle, style, ...props }, ref) => {
    return (
      <View style={[styles.container, containerStyle]}>
        {label && <Text style={styles.label}>{label}</Text>}
        <TextInput
          ref={ref}
          style={[styles.input, !!error && styles.inputError, style]}
          placeholderTextColor={theme.colors.text.muted}
          {...props}
        />
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    );
  }
);

TextField.displayName = "TextField";

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.lg,
    width: "100%",
  },
  label: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.neutral[700],
    marginBottom: theme.spacing.xs,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: theme.colors.border.default,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.text.primary,
    backgroundColor: theme.colors.background.tertiary,
  },
  inputError: {
    borderColor: theme.colors.border.error,
  },
  errorText: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.danger[500],
    marginTop: theme.spacing.xs,
  },
});
