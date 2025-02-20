import { db } from "@/server/db";
import type { ERole } from "@prisma/client";

export const userRepository = {
  async findUserByEmail(email: string) {
    return db.user.findUnique({
      where: { email },
    });
  },
  async findUserById(userid: string) {
    return db.user.findUnique({ where: { id: userid } });
  },


  async createUser(data: {
    name: string;
    email: string;
    hash: string;
    salt: string;
    role: ERole;
  }) {
    return db.user.create({ data });
  },
};
