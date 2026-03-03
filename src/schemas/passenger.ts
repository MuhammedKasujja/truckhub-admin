import z from "zod";

export const PassengerCreateSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  user_name: z.string().nullable(),
  phone: z.string(),
  email: z.string(),
  password: z.string(),
});

export const PassengerUpdateSchema = z.object({
  id: z.number(),
  ...PassengerCreateSchema.partial().shape,
});

export type PassengerCreateSchemaType = z.infer<typeof PassengerCreateSchema>;

export type PassengerUpdateSchemaType = z.infer<typeof PassengerUpdateSchema>;
