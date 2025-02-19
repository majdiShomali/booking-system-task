import {
  createTRPCRouter,
  pioneerProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
import { createPioneerSchema } from "@/schemas/pioneer.schema";
import { z } from "zod";
import { pioneerService } from "../services/pioneer.service";

export const pioneerRouter = createTRPCRouter({
  // SECTION - pioneer

  create: pioneerProcedure
    .input(createPioneerSchema)
    .mutation(async ({ ctx, input }) => {
      const user = ctx.session.user;
      return pioneerService.createPioneer(user.id, input);
    }),

  getPioneer: pioneerProcedure.query(async ({ ctx }) => {
    const user = ctx.session.user;
    return pioneerService.getPioneerProfile(user.id);
  }),

  update: pioneerProcedure
    .input(createPioneerSchema.partial())
    .mutation(async ({ ctx, input }) => {
      const user = ctx.session.user;
      return pioneerService.updatePioneerProfile(user.id, input);
    }),

  getCurrentPioneerAvailableDaySession: pioneerProcedure
    .input(z.object({ date: z.date() }))
    .query(async ({ ctx, input }) => {
      const user = ctx.session.user;
      return pioneerService.getCurrentPioneerAvailableDaySession(
        user.id,
        input.date,
      );
    }),

  getCurrentPioneerAvailableMonthSession: pioneerProcedure
    .input(z.object({ date: z.date() }))
    .query(async ({ ctx, input }) => {
      const user = ctx.session.user;
      return pioneerService.getCurrentPioneerAvailableMonthSession(
        user.id,
        input.date,
      );
    }),

  // SECTION - user

  getPioneerForUser: protectedProcedure
    .input(
      z.object({
        pioneer_id: z.string(),
      }),
    )
    .query(async ({ input }) => {
      return pioneerService.getPioneerProfileForUser(input.pioneer_id);
    }),

  getAll: protectedProcedure.query(async ({}) => {
    return pioneerService.getAllPioneers();
  }),
});
