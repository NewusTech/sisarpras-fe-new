import { z } from "zod";

export const loginValidation = z.object({
  identifier: z.string({ message: "Email atau No.HP wajib diisi" }),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

export type LoginPayload = z.infer<typeof loginValidation>;
