import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { signupSchema } from "@/schemas/signup.schema";
import authHelper from "@/helpers/auth.helper";

export const userRouter = createTRPCRouter({
  register: publicProcedure
    .input(signupSchema)
    .mutation(async ({ ctx, input }) => {
      console.log("input")
      console.log(input)
      console.log("input")
      const userRole= await ctx.db.userRole.findUnique({
        where: { name: input.role },
      });
      if(!userRole) throw new Error("No user role found");

      const existingUser = await ctx.db.user.findUnique({
        where: { email: input.email },
      });

      if (existingUser) {
        throw new Error("User already exists");
      }
      const salt = authHelper.getSalt();
      const hash = authHelper.getHash(input?.password, salt);
      const user = await ctx.db.user.create({
        data: {
          name: input.name,
          email: input.email,
          hash,
          salt,
          user_role_id:userRole?.id
        },
      });

      return  user;
    }),
});
