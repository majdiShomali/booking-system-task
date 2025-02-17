
import { z } from "zod";

// Define schema using Zod
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;


export type {LoginFormValues}
export {loginSchema}