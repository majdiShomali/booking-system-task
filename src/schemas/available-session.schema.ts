import { z } from "zod";

// Define schema using Zod
const creteAvailableSessionSchema = z.object({
  date: z.date(),
  available:z.boolean().default(false),
});

type CreateAvailableSessionFormValues = z.infer<typeof creteAvailableSessionSchema>;

export type { CreateAvailableSessionFormValues };
export { creteAvailableSessionSchema };
