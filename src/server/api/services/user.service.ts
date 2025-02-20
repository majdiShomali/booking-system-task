import authHelper from "@/helpers/auth.helper";
import { UserRepository } from "../repositories/user.repository";
import type { ERole } from "@prisma/client";

export class UserService {
  static async registerUser(
    name: string,
    email: string,
    password: string,
    role: ERole,
  ) {
    const existingUser = await UserRepository.findUserByEmail(email);
    if (existingUser) throw new Error("User already exists");

    const salt = authHelper.getSalt();
    const hash = authHelper.getHash(password, salt);

    return UserRepository.createUser({
      name,
      email,
      hash,
      salt,
      role,
    });
  }

  static async getUserById(userId: string) {
    return UserRepository.findUserById(userId);
  }

  static async getUserByEmail(email: string) {
    return UserRepository.findUserByEmail(email);
  }
}
