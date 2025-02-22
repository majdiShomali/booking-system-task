import { z } from "zod";
import { BookingService } from "../services/booking.service";
import { createTRPCRouter, protectedProcedure } from "../trpc";


export const bookingRouter = createTRPCRouter({
  /**
   * Books a session for the authenticated user.
   * @param input - Object containing the available session ID.
   * @returns The booking confirmation or relevant response.
   */
  bookSession: protectedProcedure
    .input(
      z.object({
        availableSessionId: z.string(),
      }),
    )
    .mutation(async ({ctx, input }) => {
      const user = ctx.session.user;

      return BookingService.bookSession(user.id, input.availableSessionId);
    }),

    
});
