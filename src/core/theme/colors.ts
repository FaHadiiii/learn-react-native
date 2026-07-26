/**
 * Centralized Color Palette Design Tokens
 * Change colors here to update the entire application theme seamlessly.
 */

export const colors = {
  // Brand / Primary Colors
  primary: {
    50: "#eff6ff",
    100: "#dbeafe",
    200: "#bfdbfe",
    500: "#3b82f6",
    600: "#2563eb",
    700: "#1d4ed8",
  },

  // Neutral / Grayscale Colors
  neutral: {
    50: "#f9fafb",
    100: "#f3f4f6",
    200: "#e5e7eb",
    300: "#d1d5db",
    400: "#9ca3af",
    500: "#6b7280",
    700: "#374151",
    900: "#111827",
  },

  // Semantic Feedback Colors
  danger: {
    50: "#fef2f2",
    100: "#fee2e2",
    200: "#fecaca",
    500: "#ef4444",
    600: "#dc2626",
    700: "#b91c1c",
  },

  success: {
    50: "#f0fdf4",
    500: "#22c55e",
    600: "#16a34a",
  },

  warning: {
    50: "#fffbeb",
    500: "#f59e0b",
  },

  // Base UI Colors
  background: {
    primary: "#ffffff",
    secondary: "#f3f4f6",
    tertiary: "#f9fafb",
  },

  text: {
    primary: "#111827",
    secondary: "#6b7280",
    muted: "#9ca3af",
    inverse: "#ffffff",
  },

  border: {
    light: "#e5e7eb",
    default: "#d1d5db",
    focus: "#2563eb",
    error: "#ef4444",
  },
} as const;

export type Colors = typeof colors;
