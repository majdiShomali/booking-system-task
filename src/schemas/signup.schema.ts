
import { ERole } from "@prisma/client";
import { z } from "zod";

const signupSchema = z.object({
  email: z.string().trim().email("عنوان البريد الإلكتروني غير صحيح"),
  password: z.string().min(8, "يجب أن تتكون كلمة المرور من 8 أحرف على الأقل")
    .regex(/[A-Z]/, "يجب أن تحتوي كلمة المرور على حرف كبير واحد على الأقل")
    .regex(/[a-z]/, "يجب أن تحتوي كلمة المرور على حرف صغير واحد على الأقل")
    .regex(/[0-9]/, "يجب أن تحتوي كلمة المرور على رقم واحد على الأقل")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "يجب أن تحتوي كلمة المرور على حرف خاص واحد على الأقل"),
  name: z.string().min(3, "يجب أن يتكون الاسم من 3 أحرف على الأقل"),
  role: z.enum([ERole.USER, ERole.PIONEER]),
});

const signupSchemaInitialData = {
  email: "",
  name: "",
  password: "",
  role: ERole.USER,
};

type SignupFormValues = z.infer<typeof signupSchema>;


export type {SignupFormValues}
export {signupSchema,signupSchemaInitialData}