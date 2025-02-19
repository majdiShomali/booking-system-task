import { createTRPCRouter, pioneerProcedure } from "@/server/api/trpc";
import { createPioneerSchema } from "@/schemas/pioneer.schema";
import { createAvailableSessionSchema } from "@/schemas/available-session.schema";

import { z } from "zod";
import { pioneerService } from "../services/pioneer.service";

export const pioneerRouter = createTRPCRouter({
  create: pioneerProcedure
    .input(createPioneerSchema)
    .mutation(async ({ ctx, input }) => {
      const user = ctx.session.user;
      return pioneerService.createPioneer(user.id, input);
    }),

  get: pioneerProcedure.query(async ({ ctx }) => {
    const user = ctx.session.user;
    return pioneerService.getPioneerProfile(user.id);
  }),

  update: pioneerProcedure
    .input(createPioneerSchema.partial())
    .mutation(async ({ ctx, input }) => {
      const user = ctx.session.user;
      return pioneerService.updatePioneerProfile(user.id, input);
    }),

  createAvailableSession: pioneerProcedure
    .input(createAvailableSessionSchema)
    .mutation(async ({ ctx, input }) => {
      const user = ctx.session.user;
      return pioneerService.createAvailableSession(user.id, input);
    }),

  getPioneerAvailableSession: pioneerProcedure
    .input(z.object({ date: z.date() }))
    .query(async ({ ctx, input }) => {
      const user = ctx.session.user;
      return pioneerService.getPioneerAvailableSession(user.id, input.date);
    }),
});
