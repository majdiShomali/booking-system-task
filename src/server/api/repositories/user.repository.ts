import { db } from "@/server/db";
import type { ERole } from "@prisma/client";

export class UserRepository {
  static async findUserByEmail(email: string) {
    return db.user.findUnique({
      where: { email },
    });
  }

  static async findUserById(userid: string) {
    return db.user.findUnique({ where: { id: userid } });
  }

  static async createUser(data: {
    name: string;
    email: string;
    hash: string;
    salt: string;
    role: ERole;
  }) {
    return db.user.create({ data });
  }
}
