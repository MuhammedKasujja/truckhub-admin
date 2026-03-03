import z from "zod";

export const ServiceCreateSchema = z.object({
  name: z.string(),
  display_name: z.string(),
  seats: z.number().nullable(),
  base_fare: z.number(),
  min_fare: z.number(),
  price_per_min: z.number(),
  price_per_unit_distance: z.number(),
  booking_fee: z.number().nullable(),
  tax_fee: z.number().nullable(),
  distance_unit: z.enum(["km", "miles"]).default("km"),
  vehicle_type_id: z.number(),
  description: z.string().nullable(),
});

export const ServiceUpdateSchema = z.object({
  id: z.number(),
  ...ServiceCreateSchema.partial().shape,
});

export type ServiceCreateSchemaType = z.infer<typeof ServiceCreateSchema>;

export type ServiceUpdateSchemaType = z.infer<typeof ServiceUpdateSchema>;
