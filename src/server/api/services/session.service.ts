import type { CreateAvailableSessionFormValues } from "@/schemas/available-session.schema";
import { PioneerRepository } from "../repositories/pioneer.repository";
import { SessionRepository } from "../repositories/session.repository";
import { startOfDay, endOfDay, startOfMonth, endOfMonth } from "date-fns";

export class SessionService  {

  // SECTION - pioneer 
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

    // SECTION - user
    static async getPioneerAvailableMonthSessionForUser(pioneerId: string, date: Date) {
      const startOfCurrentDayUTC = startOfDay(new Date()).toISOString();
      const endOfMonthUTC = endOfMonth(date).toISOString();
      return SessionRepository.findPioneerAvailableSessions(
        { startDate: startOfCurrentDayUTC, endDate: endOfMonthUTC },
        pioneerId,
      );
    }
    static async getPioneerAvailableDaySessionForUser(pioneerId: string, date: Date) {
      const startOfDayUTC = startOfDay(new Date()).toISOString();
      const endOfDayUTC = endOfDay(date).toISOString();
      return SessionRepository.findPioneerAvailableSessions(
        { startDate: startOfDayUTC, endDate: endOfDayUTC },
        pioneerId,
      );
    }

  // SECTION - pioneer - user

  static async getPioneerAvailableSessions(
    date: { startOfDay: string; endOfDay: string },
    pioneerId: string,
  ) {
    return SessionRepository.findPioneerAvailableSessions({ startDate: date.startOfDay, endDate: date.endOfDay }, pioneerId);
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
