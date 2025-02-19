import type { CreateAvailableSessionFormValues } from "@/schemas/available-session.schema";
import { pioneerRepository } from "../repositories/pioneer.repository";
import { sessionRepository } from "../repositories/session.repository";

export const sessionService = {

  async createAvailableSession(
    userId: string,
    input: CreateAvailableSessionFormValues,
  ) {
    const pioneer = await pioneerRepository.findPioneerByUserId(userId);
    if (!pioneer) throw new Error("Could not find pioneer");
    return sessionRepository.createAvailableSession(
      {
        date: input.date,
        available: input.available,
      },
      pioneer.id,
    );
  },

  async getAvailableSessionsForDate(
    date: { startOfDay: string; endOfDay: string },
    pioneerId: string,
  ) {
    return sessionRepository.findAvailableSessionsForDate(date,pioneerId)
  },


};
