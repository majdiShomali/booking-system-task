import { createTRPCRouter, pioneerProcedure,protectedProcedure } from "@/server/api/trpc";
import { createAvailableSessionSchema } from "@/schemas/available-session.schema";
import { SessionService } from "../services/session.service";
import { z } from "zod";


export const sessionRouter = createTRPCRouter({

  // SECTION - pioneer
  createAvailableSession: pioneerProcedure
    .input(createAvailableSessionSchema)
    .mutation(async ({ ctx, input }) => {
      const user = ctx.session.user;
      return SessionService.createAvailableSession(user.id, input);
    }),

    
  // SECTION - user - pioneer

  getPioneerAvailableDaySession: protectedProcedure
    .input(z.object({ date: z.date(), pioneer_id: z.string() }))
    .query(async ({ input }) => {
      return SessionService.getPioneerAvailableDaySession(
        input.pioneer_id,
        input.date,
      );
    }),

  getPioneerAvailableMonthSession: protectedProcedure
    .input(z.object({ date: z.date(), pioneer_id: z.string() }))
    .query(async ({ input }) => {
      return SessionService.getPioneerAvailableMonthSession(
        input.pioneer_id,
        input.date,
      );
    }),


  // getAvailableSessions:protectedProcedure
  //    .input(
  //      z.object({
  //        date: z.string(),
  //      }),
  //    )
  //    .query(async ({ input }) => {
  //      return SessionService.getPioneerProfileForUser(input.pioneer_id);
  //    }),
    

});
