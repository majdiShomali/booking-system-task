import { type CreateAvailableSessionFormValues } from "@/schemas/available-session.schema";
import { db } from "@/server/db";
// setInterval(async () => {
//   await db.bookedSession.deleteMany({
//     where: {
//       status: 'PENDING',
//       createdAt: { lt: new Date(Date.now() - 15*60*1000) } // 15min expiration
//     }
//   });
// }, 5*60*1000); // Run every 5 minutes
export class SessionRepository {
  static async createAvailableSession(
    data: CreateAvailableSessionFormValues,
    pioneerId: string,
  ) {
    // const overlapping = await db.availableSession.findFirst({
    //   where: {
    //     pioneer_id: pioneerId,
    //     OR: [
    //       { startTime: { lte: newStart }, endTime: { gte: newStart } },
    //       { startTime: { lte: newEnd }, endTime: { gte: newEnd } }
    //     ]
    //   }
    // });
    return db.availableSession.create({
      data: { ...data, pioneer_id: pioneerId },
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
