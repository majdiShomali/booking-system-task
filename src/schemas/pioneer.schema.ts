import { z } from "zod";

// Define schema using Zod
const createPioneerSchema = z.object({
  title: z.string().min(1, "العنوان مطلوب"),
  experience: z.number().min(1, "الخبرة مطلوبة"),
  session_duration: z.number().min(1, "مدة الجلسة مطلوبة"),
  bio: z.string().min(1, "السيرة الذاتية مطلوبة"),
  available: z.boolean().default(false),
  skills: z.array(z.string()).min(1, "يجب أن تكون هناك مهارة واحدة على الأقل"),
  additional_information: z.array(z.string()).optional(),
  facebook: z.string().url("رابط فيسبوك غير صالح").optional().nullable().or(z.literal("")),
  instagram: z.string().url("رابط إنستغرام غير صالح").optional().nullable().or(z.literal("")),
  twitter: z.string().url("رابط تويتر غير صالح").optional().nullable().or(z.literal("")),
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
