import {
  createTRPCRouter,
  pioneerProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
import { createAvailableSessionSchema } from "@/schemas/available-session.schema";
import { SessionService } from "../services/session.service";
import { z } from "zod";

export const sessionRouter = createTRPCRouter({
  // SECTION - pioneer

  /**
   * Creates a new available session for a pioneer.
   * @param input - The session details following the schema.
   * @returns The created session data.
   */
  createAvailableSession: pioneerProcedure
    .input(createAvailableSessionSchema)
    .mutation(async ({ ctx, input }) => {
      const user = ctx.session.user;
      return SessionService.createAvailableSession(user.id, input);
    }),

  // SECTION - user - pioneer

  /**
   * Retrieves the current month's available sessions for a given pioneer.
   * @param input - Object containing the date and pioneer ID.
   * @returns A list of available sessions for the specified month.
   */
  getCurrentPioneerAvailableMonthSession: protectedProcedure
    .input(z.object({ date: z.string(), pioneer_id: z.string() }))
    .query(async ({ input }) => {
      return SessionService.getPioneerAvailableMonthSession(
        input.pioneer_id,
        input.date,
      );
    }),

  /**
   * Retrieves the current day's available sessions for a given pioneer.
   * @param input - Object containing the date and pioneer ID.
   * @returns A list of available sessions for the specified day.
   */
  getCurrentPioneerAvailableDaySession: protectedProcedure
    .input(z.object({ date: z.string(), pioneer_id: z.string() }))
    .query(async ({ input }) => {
      return SessionService.getPioneerAvailableDaySession(
        input.pioneer_id,
        input.date,
      );
    }),
});
