import z from "zod";

export const UserCreateSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  phone: z.string().nullable(),
  email: z.string(),
  password: z.string(),
});

export const UserUpdateSchema = z.object({
  id: z.number(),
  ...UserCreateSchema.partial().shape,
});

export type UserCreateSchemaType = z.infer<typeof UserCreateSchema>;

export type UserUpdateSchemaType = z.infer<typeof UserUpdateSchema>;
