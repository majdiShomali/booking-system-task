import { db } from "@/server/db";
import { Pioneer } from "@prisma/client";

export const pioneerRepository = {
  async createPioneer(data: Pioneer) {
    return db.pioneer.create({ data });
  },

  async getPioneerByUserId(userId: string) {
    return db.pioneer.findUnique({ where: { user_id: userId } });
  },

  async updatePioneer(userId: string, data: Partial<any>) {
    return db.pioneer.update({
      where: { user_id: userId },
      data,
    });
  },

  async createAvailableSession(data: { date: string; available: boolean; pioneer_id: string }) {
    return db.availableSession.create({ data });
  },

  async getAvailableSessionsForDate(date: { startOfDay: string, endOfDay: string }, pioneerId: string) {
    return db.availableSession.findMany({
      where: {
        date: {
          gte: date.startOfDay,
          lte: date.endOfDay,
        },
        pioneer_id: pioneerId,
      },
    });
  },
};
