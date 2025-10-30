import { z } from "zod";

export const SubscriptionSchema = z.object({
  endpoint: z.string().url(),
  keys: z.object({
    p256dh: z.string().min(1),
    auth: z.string().min(1),
  }),
  expirationTime: z.number().nullable().optional(),
  userAgent: z.string().optional(),
  appType: z.enum(["Sarpras", "Sipakguru", "SmartSchool", "SuperAdmin", "all"]),
});

export type SubscriptionPayload = z.infer<typeof SubscriptionSchema>;
