import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { pioneerSchema } from "@/schemas/pioneer.schema";

export const pioneerRouter = createTRPCRouter({

  create: publicProcedure
    .input(pioneerSchema)
    .mutation(async ({ ctx, input }) => {
        console.log(input)
        // ctx.db.
    //   return ctx.db.pioneer.create({
    //     data: {
    //      ...input,
    //     },
    //   });
    }),


});
