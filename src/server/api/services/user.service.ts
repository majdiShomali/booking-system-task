import authHelper from "@/helpers/auth.helper";
import { userRepository } from "../repositories/user.repository";
import type { ERole } from "@prisma/client";

export const userService = {
  async registerUser(name: string, email: string, password: string, role: ERole) {


    const existingUser = await userRepository.findUserByEmail(email);
    if (existingUser) throw new Error("User already exists");

    const salt = authHelper.getSalt();
    const hash = authHelper.getHash(password, salt);

    return userRepository.createUser({
      name,
      email,
      hash,
      salt,
      role,
    });
  },
  async getUserById(userId: string) {
  return userRepository.findUserById(userId);
  },
  async getUserByEmail(email: string) {
  return userRepository.findUserByEmail(email);
  },
};
