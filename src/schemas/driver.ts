import z from "zod";

export const DriverCreateSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  user_name: z.string().nullable(),
  phone: z.string(),
  email: z.string(),
  password: z.string(),
});

export const DriverUpdateSchema = z.object({
  id: z.number(),
  ...DriverCreateSchema.partial().shape,
});

export type DriverCreateSchemaType = z.infer<typeof DriverCreateSchema>;

export type DriverUpdateSchemaType = z.infer<typeof DriverUpdateSchema>;
