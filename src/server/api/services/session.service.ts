import type { CreateAvailableSessionFormValues } from "@/schemas/available-session.schema";
import { pioneerRepository } from "../repositories/pioneer.repository";
import { sessionRepository } from "../repositories/session.repository";
import { startOfDay, endOfDay, startOfMonth, endOfMonth } from "date-fns";

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

  async getPioneerAvailableDaySession(pioneerId: string, date: Date) {
    const startOfDayUTC = startOfDay(date).toISOString();
    const endOfDayUTC = endOfDay(date).toISOString();
    return sessionRepository.findPioneerAvailableSessions(
      { startOfDay: startOfDayUTC, endOfDay: endOfDayUTC },
      pioneerId,
    );
  },
  
  async getPioneerAvailableMonthSession(pioneerId: string, date: Date) {
    const startOfDayUTC = startOfMonth(date).toISOString();
    const endOfDayUTC = endOfMonth(date).toISOString();
    return sessionRepository.findPioneerAvailableSessions(
      { startOfDay: startOfDayUTC, endOfDay: endOfDayUTC },
      pioneerId,
    );
  },

  async getPioneerAvailableSessions(
    date: { startOfDay: string; endOfDay: string },
    pioneerId: string,
  ) {
    return sessionRepository.findPioneerAvailableSessions(date, pioneerId);
  },
};
