import { z } from "zod";

// Define schema using Zod
const loginSchema = z.object({
  email: z.string().trim().email("عنوان البريد الإلكتروني غير صحيح"),
  password: z
    .string()
    .min(8, "يجب أن تتكون كلمة المرور من 8 أحرف على الأقل")
    .regex(/[A-Z]/, "يجب أن تحتوي كلمة المرور على حرف كبير واحد على الأقل")
    .regex(/[a-z]/, "يجب أن تحتوي كلمة المرور على حرف صغير واحد على الأقل")
    .regex(/[0-9]/, "يجب أن تحتوي كلمة المرور على رقم واحد على الأقل")
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      "يجب أن تحتوي كلمة المرور على حرف خاص واحد على الأقل"
    ),
});

const loginSchemaInitialData = {
  email: "saraahmad@gmail.com",
  password: "Password@1234",
};

type LoginFormValues = z.infer<typeof loginSchema>;

export type { LoginFormValues };
export { loginSchema, loginSchemaInitialData };
