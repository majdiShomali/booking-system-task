import { db } from "@/server/db";
import { BookingRepository } from "../repositories/booking.repository";
import { io } from "@/server/socket";
import { BookingStatus } from "@prisma/client";
import { SessionService } from "./session.service";

export class BookingService {
  static async bookSession(userId: string, availableSessionId: string) {
    try {
      const booking = await db.$transaction(async (tx) => {
        const session =
          await SessionService.findAvailableSessionById(availableSessionId);
        if (!session?.id) {
          throw new Error("No session found ");
        }
        if (!session?.available) {
          throw new Error("Session already booked!");
        }

        await SessionService.markSessionAsUnavailable(availableSessionId);

        const newBooking = await BookingRepository.createBooking(
          userId,
          availableSessionId,
        );

        io.emit("session_booked", {
          id: availableSessionId,
          status: BookingStatus.PENDING,
          available: false,
        });

        return newBooking;
      });

      return booking;
    } catch (error) {
      console.error("Booking failed:", error);
      throw new Error("This session is no longer available.");
    }
  }
}
