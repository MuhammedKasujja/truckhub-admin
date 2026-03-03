import z from "zod";

export const ReviewCreateSchema = z.object({
  passenger_id: z.string(),
  request_id: z.string(),
  rating: z.number(),
  comment: z.string().nullable(),
});

export const ReviewUpdateSchema = z.object({
  id: z.number(),
  ...ReviewCreateSchema.partial().shape,
});

export type ReviewCreateSchemaType = z.infer<typeof ReviewCreateSchema>;

export type ReviewUpdateSchemaType = z.infer<typeof ReviewUpdateSchema>;
