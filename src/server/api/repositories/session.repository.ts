import { type CreateAvailableSessionFormValues } from "@/schemas/available-session.schema";
import { db } from "@/server/db";

export class SessionRepository {
  static async createAvailableSession(
    data: CreateAvailableSessionFormValues,
    pioneerId: string,
  ) {
    const existingSession = await db.availableSession.findUnique({
      where: {
        pioneer_id_date: {
          pioneer_id: pioneerId,
          date: data.date,
        },
      },
    });
    if (existingSession) throw new Error(`Session already exists`)
    return db.availableSession.create({
      data: { ...data, pioneer_id: pioneerId,date:new Date(data.date) },
    });
  }

  static async findPioneerAvailableSessions(
    date: { startDate: string; endDate: string },
    pioneerId: string,
  ) {
    return db.availableSession.findMany({
      where: {
        date: {
          gte: date.startDate,
          lte: date.endDate,
        },
        pioneer_id: pioneerId,
        available: true,
      },
    });
  }
  
  static async findAvailableSessionById(sessionId: string) {
    return db.availableSession.findUnique({
      where: { id: sessionId,available:true },
    });
  }

  static async markSessionAsUnavailable(sessionId: string) {
    return db.availableSession.update({
      where: { id: sessionId },
      data: { available: false },
    });
  }


}
