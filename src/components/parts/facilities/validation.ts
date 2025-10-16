import { z } from "zod";

export const facilitySubmissionSchema = z.object({
  categoryId: z
    .union([
      z.number().min(1, "Kategori tidak valid"),
      z
        .string()
        .min(1)
        .transform((val) => Number(val)),
    ])
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Kategori harus berupa angka valid",
    }),

  name: z
    .string({
      required_error: "Nama wajib diisi",
    })
    .min(1, "Nama tidak boleh kosong"),

  quantity: z
    .union([
      z.number().min(1, "Jumlah minimal 1"),
      z
        .string()
        .min(1)
        .transform((val) => Number(val)),
    ])
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Jumlah harus berupa angka valid",
    }),

  priority: z.enum(["URGENT", "NOT_URGENT"], {
    required_error: "Prioritas wajib diisi",
    invalid_type_error: "Prioritas harus URGENT atau NOT_URGENT",
  }),

  reason: z
    .string({
      required_error: "Alasan wajib diisi",
    })
    .min(1, "Alasan tidak boleh kosong"),

  estimateBudget: z
    .union([
      z.number().min(1, "Estimasi anggaran minimal 1"),
      z
        .string()
        .min(1)
        .transform((val) => Number(val)),
    ])
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Estimasi anggaran harus berupa angka valid",
    }),

  infrastructureId: z
    .union([
      z.number().min(1, "Infrastruktur tidak valid"),
      z
        .string()
        .min(1)
        .transform((val) => Number(val)),
    ])
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Infrastruktur harus berupa angka valid",
    }),
  supportingDocument: z.any().optional(),
  documentation: z.any().optional(),
});

export type FacilitySubmissionPayload = z.infer<
  typeof facilitySubmissionSchema
>;
