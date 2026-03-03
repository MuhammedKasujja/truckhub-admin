import z from "zod";

export const VehicleCreateSchema = z.object({
  plate_number: z.string(),
  color: z.string(),
  interior_color: z.string().nullable(),
  cylinders: z.number(),
  tank_capacity: z.number(),
  engine_type: z.enum(["petrol", "desel"]),
  gearbox: z.enum(["manual", "automatic"]),
  year: z.string(),
  seats: z.number().nullable(),
  vehicle_type_id: z.number(),
  car_model_id: z.number(),
  drive_train_id: z.number(),
  tonnage_id: z.number().nullable(),
});

export const VehicleUpdateSchema = z.object({
  id: z.number(),
  ...VehicleCreateSchema.partial().shape,
});

export type VehicleCreateSchemaType = z.infer<typeof VehicleCreateSchema>;

export type VehicleUpdateSchemaType = z.infer<typeof VehicleUpdateSchema>;
