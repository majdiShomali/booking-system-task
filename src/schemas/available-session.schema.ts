import { z } from "zod";


const createAvailableSessionSchema = z.object({
  date: z.string(),
  available: z.boolean().default(false),
  time_zone: z.string(),
});


type CreateAvailableSessionFormValues = z.infer<typeof createAvailableSessionSchema>;

export type { CreateAvailableSessionFormValues };
export { createAvailableSessionSchema };
