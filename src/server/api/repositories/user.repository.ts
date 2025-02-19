import { db } from "@/server/db";
import type { ERole } from "@prisma/client";

export const userRepository = {
  async findUserByEmail(email: string) {
    return db.user.findUnique({
      where: { email },
      include: {
        role: true,
      },
    });
  },
  async findUserById(userid: string) {
    return db.user.findUnique({ where: { id: userid } });
  },

  async findUserRole(roleName: ERole) {
    return db.userRole.findUnique({ where: { name: roleName } });
  },

  async createUser(data: {
    name: string;
    email: string;
    hash: string;
    salt: string;
    user_role_id: string;
  }) {
    return db.user.create({ data });
  },
};
