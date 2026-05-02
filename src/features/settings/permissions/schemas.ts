import z from "zod";

export const RoleCreateSchema = z.object({
  name: z.string(),
});

export const RoleUpdateSchema = z.object({
  id: z.number(),
  ...RoleCreateSchema.partial().shape,
});

export type RoleCreateSchemaType = z.infer<typeof RoleCreateSchema>;

export type RoleUpdateSchemaType = z.infer<typeof RoleUpdateSchema>;
