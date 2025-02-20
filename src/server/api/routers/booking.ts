import { z } from "zod";
import { BookingService } from "../services/booking.service";
import { createTRPCRouter, protectedProcedure } from "../trpc";


export const bookingRouter = createTRPCRouter({

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
