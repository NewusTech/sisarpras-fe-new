import { z } from "zod";

export const infrastructureSchema = z.object({
  categoryId: z
    .union([
      z.number().min(1, "Kategori tidak valid"),
      z
        .string()
        .min(1, "Kategori wajib diisi")
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
        .min(1, "Jumlah wajib diisi")
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
        .min(1, "Estimasi anggaran wajib diisi")
        .transform((val) => Number(val)),
    ])
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Estimasi anggaran harus berupa angka valid",
    }),

  totalArea: z.string().min(1, "Luas total wajib diisi"),

  description: z
    .string({
      required_error: "Deskripsi wajib diisi",
    })
    .min(1, "Deskripsi tidak boleh kosong"),

  gradeId: z.union([z.number(), z.string()]).optional(),
  groupId: z.union([z.number(), z.string()]).optional(),

  supportingDocument: z.any().optional(),
  documentation: z.any().optional(),
});

export type InfrastructurePayload = z.infer<typeof infrastructureSchema>;
