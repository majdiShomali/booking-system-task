import { z } from "zod";

// Define schema using Zod
const createPioneerSchema = z.object({
  title: z.string().min(1, "title is required"),
  experience: z.number().min(1, "experience is required"),
  session_duration: z.number().min(1, "session duration is required"),
  bio: z.string().min(1, "bio is required"),
  available: z.boolean().default(false),
  skills: z.array(z.string()).min(1, "At least one skill is required"),
  additional_information: z.array(z.string()).optional(),
  facebook: z.string().url("Invalid Facebook URL").optional().nullable().or(z.literal("")),
  instagram: z.string().url("Invalid Instagram URL").optional().nullable().or(z.literal("")),
  twitter: z.string().url("Invalid Twitter URL").optional().nullable().or(z.literal("")),
});
const updatePioneerSchema = createPioneerSchema.partial().extend({
  id: z.string().min(1, "id is required"),
});

const createPioneerInitialData = {
  title: "",
  experience: 0,
  session_duration: 0,
  bio: "",
  available: false,
  skills: [],
  facebook: "",
  instagram: "",
  twitter: "",
  additional_information: [],
};

type CreatePioneerFormValues = z.infer<typeof createPioneerSchema>;
type UpdatePioneerFormValues = z.infer<typeof updatePioneerSchema>;

export type { CreatePioneerFormValues,UpdatePioneerFormValues };
export { createPioneerSchema,updatePioneerSchema,createPioneerInitialData};
