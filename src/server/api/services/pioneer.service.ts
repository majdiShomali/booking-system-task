import { startOfDay, endOfDay, startOfMonth, endOfMonth } from "date-fns";
import { PioneerRepository } from "../repositories/pioneer.repository";
import type { TPioneer } from "@/types/pioneer.types";
import type { CreatePioneerFormValues } from "@/schemas/pioneer.schema";
import { SessionService } from "./session.service";

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

  static async getCurrentPioneerAvailableDaySession(
    userId: string,
    date: Date,
  ) {
    const startOfDayUTC = startOfDay(date).toISOString();
    const endOfDayUTC = endOfDay(date).toISOString();
    const pioneer = await PioneerRepository.findPioneerByUserId(userId);
    if (!pioneer) throw new Error("Could not find pioneer");
    return SessionService.getPioneerAvailableSessions(
      { startOfDay: startOfDayUTC, endOfDay: endOfDayUTC },
      pioneer.id,
    );
  }

  static async getCurrentPioneerAvailableMonthSession(
    userId: string,
    date: Date,
  ) {
    const startOfDayUTC = startOfMonth(date).toISOString();
    const endOfDayUTC = endOfMonth(date).toISOString();
    const pioneer = await PioneerRepository.findPioneerByUserId(userId);

    if (!pioneer) throw new Error("Could not find pioneer");

    return SessionService.getPioneerAvailableSessions(
      { startOfDay: startOfDayUTC, endOfDay: endOfDayUTC },
      pioneer.id,
    );
  }

  // SECTION - User
  // NOTE: In the future, we may restrict access to certain fields for users.
  static async getPioneerProfileForUser(pioneerId: string) {
    return PioneerRepository.findPioneerById(pioneerId);
  }
}
