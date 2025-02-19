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

  async findPioneerByUserId(userId: string) {
    return db.pioneer.findUnique({
      where: { user_id: userId },
      include: { user: true },
    });
  },
  async findPioneerById(pioneerId: string) {
    return db.pioneer.findUnique({
      where: { id: pioneerId },
      include: { user: true },
    });
  },
  async findAllPioneers() {
    return db.pioneer.findMany({
      include: { user: true },
    });
  },

  async updatePioneer(userId: string, data: Partial<UpdatePioneerFormValues>) {
    return db.pioneer.update({
      where: { user_id: userId },
      data,
    });
  },


};
