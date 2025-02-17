
import { z } from "zod";

const signupSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
  name: z.string().min(3, "name must be at least 3 characters"),
  role: z.string().min(1, "role is required"),
});

type SignupFormValues = z.infer<typeof signupSchema>;


export type {SignupFormValues}
export {signupSchema}