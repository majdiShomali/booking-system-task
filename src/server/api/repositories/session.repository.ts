import { type CreateAvailableSessionFormValues } from "@/schemas/available-session.schema";
import { db } from "@/server/db";
import cron from 'node-cron';


cron.schedule('*/5 * * * *', () => {
  (async () => {
    try {
      const expiredSessions = await db.availableSession.findMany({
        where: {
          date: {
            lt: new Date(),
          },
          available: true,
        },
      });

      if (expiredSessions.length > 0) {
        await db.availableSession.updateMany({
          where: {
            id: {
              in: expiredSessions.map(session => session.id),
            },
          },
          data: {
            available: false,
          },
        });

        console.log(`${expiredSessions.length} sessions marked as unavailable.`);
      } else {
        console.log('No expired sessions found.');
      }
    } catch (error) {
      console.error('Error updating sessions:', error);
    }
  })();
});





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
