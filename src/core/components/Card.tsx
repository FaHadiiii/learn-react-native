import React, { ReactNode } from "react";
import { View, StyleSheet, ViewStyle, StyleProp } from "react-native";
import { theme } from "../theme";

export interface CardProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function Card({ children, style }: CardProps) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    maxWidth: 400,
    padding: theme.spacing.xl,
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.xl,
    ...theme.shadows.md,
  },
});
