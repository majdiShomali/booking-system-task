import { z } from "zod";

// Define schema using Zod
const createAvailableSessionSchema = z.object({
  date: z.date(),
  available: z.boolean().default(false),
});


type CreateAvailableSessionFormValues = z.infer<typeof createAvailableSessionSchema>;

export type { CreateAvailableSessionFormValues };
export { createAvailableSessionSchema };
