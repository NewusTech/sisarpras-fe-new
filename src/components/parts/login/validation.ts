import { z } from "zod";

export const loginValidation = z.object({
  identifier: z.string({ message: "Email atau No.HP wajib diisi" }),
  password: z.string().min(6, "Password minimal 6 karakter"),
  isSavePassword: z.coerce.boolean().optional().default(false),
});

export type LoginPayload = z.infer<typeof loginValidation>;

export const forgoutPasswordValidation = z.object({
  email: z.string().email("Email tidak valid"),
});

export type ForgoutPasswordPayload = z.infer<typeof forgoutPasswordValidation>;

export const resetPasswordValidation = z.object({
  newPassword: z.string(),
  confirmPassword: z.string(),
});

export type ResetPasswordPayload = z.infer<typeof resetPasswordValidation>;
