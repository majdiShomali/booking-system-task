import { z } from "zod";

// Define schema using Zod
const availableSessionSchema = z.object({
  date: z.date(),
  timezone: z.string().min(1, "timezone is required"),
  available:z.boolean().default(false),
});

type AvailableSessionFormValues = z.infer<typeof availableSessionSchema>;

export type { AvailableSessionFormValues };
export { availableSessionSchema };
