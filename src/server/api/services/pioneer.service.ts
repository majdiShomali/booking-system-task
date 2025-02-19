import { startOfDay, endOfDay } from "date-fns";
import { pioneerRepository } from "../repositories/pioneer.repository";

export const pioneerService = {
  async createPioneer(userId: string, input: any) {
    return pioneerRepository.createPioneer({
      ...input,
      user_id: userId,
    });
  },

  async getPioneerProfile(userId: string) {
    return pioneerRepository.getPioneerByUserId(userId);
  },

  async updatePioneerProfile(userId: string, input: Partial<any>) {
    const existingPioneer = await pioneerRepository.getPioneerByUserId(userId);
    if (!existingPioneer) throw new Error("Profile not found");

    return pioneerRepository.updatePioneer(userId, input);
  },

  async createAvailableSession(userId: string, input: any) {
    const pioneer = await pioneerRepository.getPioneerByUserId(userId);
    if (!pioneer) throw new Error("Could not find pioneer");

    return pioneerRepository.createAvailableSession({
      date: input.date,
      available: input.available,
      pioneer_id: pioneer.id,
    });
  },

  async getPioneerAvailableSession(userId: string, date: Date) {
    const startOfDayUTC = startOfDay(date).toISOString();
    const endOfDayUTC = endOfDay(date).toISOString();
    const pioneer = await pioneerRepository.getPioneerByUserId(userId);

    if (!pioneer) throw new Error("Could not find pioneer");

    return pioneerRepository.getAvailableSessionsForDate(
      { startOfDay: startOfDayUTC, endOfDay: endOfDayUTC },
      pioneer.id
    );
  },
};
