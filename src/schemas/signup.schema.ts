
import { ERole } from "@/types/auth.types";
import { z } from "zod";

const signupSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
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