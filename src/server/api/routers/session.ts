import { createTRPCRouter, pioneerProcedure } from "@/server/api/trpc";
import { createAvailableSessionSchema } from "@/schemas/available-session.schema";
import { sessionService } from "../services/session.service";


export const sessionRouter = createTRPCRouter({
  createAvailableSession: pioneerProcedure
    .input(createAvailableSessionSchema)
    .mutation(async ({ ctx, input }) => {
      const user = ctx.session.user;
      return sessionService.createAvailableSession(user.id, input);
    }),
    

});
