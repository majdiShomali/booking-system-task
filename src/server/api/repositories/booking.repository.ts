import { db } from "@/server/db";

export class BookingRepository {


  static async createBooking(userId: string, availableSessionId: string) {
    return db.bookedSession.create({
      data: {
        user_id: userId,
        available_session_id: availableSessionId,
      },
    });
  }
}
