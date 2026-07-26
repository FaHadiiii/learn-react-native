import { z } from "zod";

/**
 * Validation Schemas & Types derived via Zod
 * Used by React Hook Form for client validation and by API service for payload contracts.
 */
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export type LoginFormData = z.infer<typeof loginSchema>;
