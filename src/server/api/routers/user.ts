import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { signupSchema } from "@/schemas/signup.schema";
import { UserService } from "../services/user.service";

export const userRouter = createTRPCRouter({
  /**
   * Registers a new user.
   * @param input - Object containing the user's name, email, password, and role.
   * @returns The created user data.
   */
  register: publicProcedure.input(signupSchema).mutation(async ({ input }) => {
    return UserService.registerUser(
      input.name,
      input.email,
      input.password,
      input.role,
    );
  }),
});
