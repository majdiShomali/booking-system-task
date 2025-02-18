import {
  createTRPCRouter,
  pioneerProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { pioneerSchema } from "@/schemas/pioneer.schema";
import { availableSessionSchema } from "@/schemas/available-session.schema";

export const pioneerRouter = createTRPCRouter({
  create: pioneerProcedure
    .input(pioneerSchema)
    .mutation(async ({ ctx, input }) => {
      const user = ctx.session.user;
      return ctx.db.pioneer.create({
        data: {
          title: input.title,
          bio: input.bio,
          skills: input.skills,
          additional_information: input.additional_information,
          experience: input.experience,
          available: input.available,
          facebook: input.facebook || "",
          instagram: input.instagram || "",
          twitter: input.twitter || "",
          user_id: user.id,
        },
      });
    }),

  get: pioneerProcedure.query(async ({ ctx }) => {
    const user = ctx.session.user;
    const pioneer = await ctx.db.pioneer.findUnique({
      where: {
        user_id: user.id,
      },
    });

    return pioneer;
  }),

  update: pioneerProcedure
    .input(pioneerSchema.partial())
    .mutation(async ({ ctx, input }) => {
      const user = ctx.session.user;

      const existingPioneer = await ctx.db.pioneer.findUnique({
        where: {
          user_id: user.id,
        },
      });

      if (!existingPioneer) {
        throw new Error("Profile not found");
      }

      return ctx.db.pioneer.update({
        where: {
          user_id: user.id,
        },
        data: {
          title: input.title ?? existingPioneer.title,
          bio: input.bio ?? existingPioneer.bio,
          skills: input.skills ?? existingPioneer.skills,
          experience: input.experience ?? existingPioneer.experience,
          available: input.available ?? existingPioneer.available,
          facebook: input.facebook ?? existingPioneer.facebook,
          instagram: input.instagram ?? existingPioneer.instagram,
          twitter: input.twitter ?? existingPioneer.twitter,
          additional_information:
            input.additional_information ??
            existingPioneer.additional_information,
        },
      });
    }),

  createAvailableSession: pioneerProcedure
    .input(availableSessionSchema)
    .mutation(async ({ ctx, input }) => {
      const user = ctx.session.user;
      const pioneer = await ctx.db.pioneer.findUnique({
        where: {
          user_id: user.id,
        },
      });
      if (!pioneer) throw new Error("Could not find pioneer");
      return ctx.db.availableSession.create({
        data: {
          date: input.date,
          available: input.available,
          timezone: input.timezone,
          pioneer_id: pioneer.id,
        },
      });
    }),
});
