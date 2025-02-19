import { type CreateAvailableSessionFormValues } from "@/schemas/available-session.schema";
import { db } from "@/server/db";

export const sessionRepository = {
  async createAvailableSession(
    data: CreateAvailableSessionFormValues,
    pioneer_id: string,
  ) {
    return db.availableSession.create({ data: { ...data, pioneer_id } });
  },

  async findPioneerAvailableSessions(
    date: { startOfDay: string; endOfDay: string },
    pioneerId: string,
  ) {
    return db.availableSession.findMany({
      where: {
        date: {
          gte: date.startOfDay,
          lte: date.endOfDay,
        },
        pioneer_id: pioneerId,
        available: true,
      },
    });
  },
};
