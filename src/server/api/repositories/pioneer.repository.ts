import type {
  CreatePioneerFormValues,
  UpdatePioneerFormValues,
} from "@/schemas/pioneer.schema";
import { db } from "@/server/db";

export class PioneerRepository {
  static async createPioneer(data: CreatePioneerFormValues, user_id: string) {
    return db.pioneer.create({
      data: { ...data, user_id },
    });
  }

  static async findPioneerByUserId(userId: string) {
    return db.pioneer.findUnique({
      where: { user_id: userId },
      include: { user: true },
    });
  }
  static async findPioneerById(pioneerId: string) {
    return db.pioneer.findUnique({
      where: { id: pioneerId },
      include: { user: true },
    });
  }
  static async findAllPioneers() {
    return db.pioneer.findMany({
      include: { user: true },
    });
  }

  static async updatePioneer(userId: string, data: Partial<UpdatePioneerFormValues>) {
    return db.pioneer.update({
      where: { user_id: userId },
      data,
    });
  }
}
