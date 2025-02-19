import type { CreateAvailableSessionFormValues } from "@/schemas/available-session.schema";
import type {
  CreatePioneerFormValues,
  UpdatePioneerFormValues,
} from "@/schemas/pioneer.schema";
import { db } from "@/server/db";

export const pioneerRepository = {
  async createPioneer(data: CreatePioneerFormValues, user_id: string) {
    return db.pioneer.create({
      data: { ...data, user_id },
    });
  },

  async getPioneerByUserId(userId: string) {
    return db.pioneer.findUnique({
      where: { user_id: userId },
      include: { user: true },
    });
  },

  async updatePioneer(userId: string, data: Partial<UpdatePioneerFormValues>) {
    return db.pioneer.update({
      where: { user_id: userId },
      data,
    });
  },

  async createAvailableSession(
    data: CreateAvailableSessionFormValues,
    pioneer_id: string,
  ) {
    return db.availableSession.create({ data: { ...data, pioneer_id } });
  },

  async getAvailableSessionsForDate(
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
      },
    });
  },
};
