import authHelper from "@/helpers/auth.helper";
import { userRepository } from "../repositories/user.repository";
import { ERole } from "@prisma/client";

export const userService = {
  async registerUser(name: string, email: string, password: string, role: ERole) {
    const userRole = await userRepository.findUserRole(role);
    if (!userRole) throw new Error("No user role found");

    const existingUser = await userRepository.findUserByEmail(email);
    if (existingUser) throw new Error("User already exists");

    const salt = authHelper.getSalt();
    const hash = authHelper.getHash(password, salt);

    return userRepository.createUser({
      name,
      email,
      hash,
      salt,
      user_role_id: userRole.id,
    });
  },
};
