
import { ERole } from "@prisma/client";
import { z } from "zod";

const signupSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
  name: z.string().min(3, "name must be at least 3 characters"),
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