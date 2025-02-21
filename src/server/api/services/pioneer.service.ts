import { PioneerRepository } from "../repositories/pioneer.repository";
import type { TPioneer } from "@/types/pioneer.types";
import type { CreatePioneerFormValues } from "@/schemas/pioneer.schema";

export class PioneerService {
  // SECTION - pioneer
  static async createPioneer(userId: string, input: CreatePioneerFormValues) {
    return PioneerRepository.createPioneer(
      {
        ...input,
      },
      userId,
    );
  }
  static async getPioneerProfile(userId: string) {
    return PioneerRepository.findPioneerByUserId(userId);
  }

  static async getAllPioneers() {
    return PioneerRepository.findAllPioneers();
  }

  static async updatePioneerProfile(userId: string, input: Partial<TPioneer>) {
    const existingPioneer = await PioneerRepository.findPioneerByUserId(userId);
    if (!existingPioneer) throw new Error("Profile not found");

    return PioneerRepository.updatePioneer(userId, input);
  }

  // SECTION - User
  // NOTE: In the future, we may restrict access to certain fields for users.
  static async getPioneerProfileForUser(pioneerId: string) {
    return PioneerRepository.findPioneerById(pioneerId);
  }
}
