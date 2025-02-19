import { db } from "@/server/db";
import { ERole } from "@prisma/client";

export const userRepository = {
  async findUserByEmail(email: string) {
    return db.user.findUnique({ where: { email } });
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
