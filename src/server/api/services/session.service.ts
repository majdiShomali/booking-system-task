import type { CreateAvailableSessionFormValues } from "@/schemas/available-session.schema";
import { PioneerRepository } from "../repositories/pioneer.repository";
import { SessionRepository } from "../repositories/session.repository";
import { startOfDay, endOfDay, startOfMonth, endOfMonth } from "date-fns";

export class SessionService  {
  static async createAvailableSession(
    userId: string,
    input: CreateAvailableSessionFormValues,
  ) {
    const pioneer = await PioneerRepository.findPioneerByUserId(userId);
    if (!pioneer) throw new Error("Could not find pioneer");
    return SessionRepository.createAvailableSession(
      {
        date: input.date,
        available: input.available,
      },
      pioneer.id,
    );
  }

  static async getPioneerAvailableDaySession(pioneerId: string, date: Date) {
    const startOfDayUTC = startOfDay(date).toISOString();
    const endOfDayUTC = endOfDay(date).toISOString();
    return SessionRepository.findPioneerAvailableSessions(
      { startOfDay: startOfDayUTC, endOfDay: endOfDayUTC },
      pioneerId,
    );
  }
  
  static async getPioneerAvailableMonthSession(pioneerId: string, date: Date) {
    const startOfDayUTC = startOfMonth(date).toISOString();
    const endOfDayUTC = endOfMonth(date).toISOString();
    return SessionRepository.findPioneerAvailableSessions(
      { startOfDay: startOfDayUTC, endOfDay: endOfDayUTC },
      pioneerId,
    );
  }

  static async getPioneerAvailableSessions(
    date: { startOfDay: string; endOfDay: string },
    pioneerId: string,
  ) {
    return SessionRepository.findPioneerAvailableSessions(date, pioneerId);
  }

  static  async findAvailableSessionById(
    sessionId: string,
  ) {
    return SessionRepository.findAvailableSessionById(sessionId);
  }

 static async markSessionAsUnavailable(
    availableSessionId: string,
  ) {
    return SessionRepository.markSessionAsUnavailable(availableSessionId);
  }
};
