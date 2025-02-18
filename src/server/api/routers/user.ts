import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { signupSchema } from "@/schemas/signup.schema";
import authHelper from "@/helpers/auth.helper";
import { loginSchema } from "@/schemas/login.schema";

export const userRouter = createTRPCRouter({
  register: publicProcedure
    .input(signupSchema)
    .mutation(async ({ ctx, input }) => {
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
  // login: publicProcedure
  //   .input(loginSchema)
  //   .mutation(async ({ ctx, input }) => {
  //     const existingUser = await ctx.db.user.findUnique({
  //       where: { email: input.email },
  //       include: {
  //         role: true, 
  //       },
  //     });

  //     if (!existingUser) {
  //       throw new Error("User not found");
  //     }
  //     const isPswrdValid = authHelper.validatePassword(
  //       existingUser.salt,
  //       existingUser.hash,
  //       input.password,
  //     );
  //     if (!isPswrdValid) {
  //       throw new Error("Email or password not valid");
  //     }


  //     return  existingUser;
  //   }),
});
