import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { signupSchema } from "@/schemas/signup.schema";
import { userService } from "../services/user.service";


export const userRouter = createTRPCRouter({
  register: publicProcedure
    .input(signupSchema)
    .mutation(async ({ input }) => {
      return userService.registerUser(input.name, input.email, input.password, input.role);
    }),
});
