import {
  createTRPCRouter,
  pioneerProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
import { createPioneerSchema } from "@/schemas/pioneer.schema";
import { z } from "zod";
import { PioneerService } from "../services/pioneer.service";

export const pioneerRouter = createTRPCRouter({
  // SECTION - pioneer

  /**
   * Creates a new pioneer profile.
   * @param input - Pioneer profile details based on the schema.
   * @returns The created pioneer profile data.
   */
  create: pioneerProcedure
    .input(createPioneerSchema)
    .mutation(async ({ ctx, input }) => {
      const user = ctx.session.user;
      return PioneerService.createPioneer(user.id, input);
    }),

  /**
   * Retrieves the profile of the authenticated pioneer.
   * @returns The pioneer profile data.
   */
  getPioneer: pioneerProcedure.query(async ({ ctx }) => {
    const user = ctx.session.user;
    return PioneerService.getPioneerProfile(user.id);
  }),

  /**
   * Updates the authenticated pioneer's profile.
   * @param input - Partial pioneer profile details for update.
   * @returns The updated pioneer profile data.
   */
  update: pioneerProcedure
    .input(createPioneerSchema.partial())
    .mutation(async ({ ctx, input }) => {
      const user = ctx.session.user;
      return PioneerService.updatePioneerProfile(user.id, input);
    }),

  // SECTION - User
  // NOTE: In the future, we may restrict access to certain fields for users.

  /**
   * Retrieves a pioneer's profile for a user.
   * @param input - Object containing the pioneer ID.
   * @returns The pioneer's profile data accessible to users.
   */
  getPioneerForUser: protectedProcedure
    .input(
      z.object({
        pioneer_id: z.string(),
      }),
    )
    .query(async ({ input }) => {
      return PioneerService.getPioneerProfileForUser(input.pioneer_id);
    }),

  getAll: protectedProcedure.query(async ({}) => {
    return PioneerService.getAllPioneers();
  }),
});
