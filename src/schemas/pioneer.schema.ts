import { z } from "zod";

// Define schema using Zod
const pioneerSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "title is required"),
  experience: z.string().min(1, "experience is required"),
  bio: z.string().min(1, "bio is required"),
  available: z.boolean().default(false),
  skills: z.array(z.string()).min(1, "At least one skill is required"),
  additional_information: z.array(z.string()).optional(),
  facebook: z.string().url("Invalid Facebook URL").optional().or(z.literal("")),
  instagram: z.string().url("Invalid Instagram URL").optional().or(z.literal("")),
  twitter: z.string().url("Invalid twitter URL").optional().or(z.literal("")),
});

type PioneerFormValues = z.infer<typeof pioneerSchema>;

export type { PioneerFormValues };
export { pioneerSchema };
