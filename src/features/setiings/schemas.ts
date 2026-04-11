import z from "zod";

export const EditSettingsSchema = z.object({
  search_radius: z.number(),
  counter_padding: z.number().optional(),
  default_number_pattern: z.string().optional().nullable(),
  user_number_pattern: z.string().optional().nullable(),
  vehicle_number_pattern: z.string().optional().nullable(),
  customer_number_pattern: z.string().optional().nullable(),
  driver_number_pattern: z.string().optional().nullable(),
  booking_number_pattern: z.string().optional().nullable(),
  rides_number_pattern: z.string().optional().nullable(),
  payment_number_pattern: z.string().optional().nullable(),
});

export type Settings = z.infer<typeof EditSettingsSchema>;

export type EditSettingsSchemaType = z.infer<typeof EditSettingsSchema>;
