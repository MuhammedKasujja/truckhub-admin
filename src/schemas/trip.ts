import z from "zod";

export const TripCreateSchema = z.object({
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

export const TripUpdateSchema = z.object({
  id: z.number(),
  ...TripCreateSchema.partial().shape,
});

export type TripCreateSchemaType = z.infer<typeof TripCreateSchema>;

export type TripUpdateSchemaType = z.infer<typeof TripUpdateSchema>;
