import { startOfDay, endOfDay, startOfMonth, endOfMonth } from "date-fns";
import { pioneerRepository } from "../repositories/pioneer.repository";
import type { TPioneer } from "@/types/pioneer.types";
import type { CreatePioneerFormValues } from "@/schemas/pioneer.schema";
import { sessionService } from "./session.service";

export const pioneerService = {
  // SECTION - pioneer
  async createPioneer(userId: string, input: CreatePioneerFormValues) {
    return pioneerRepository.createPioneer(
      {
        ...input,
      },
      userId,
    );
  },
  async getPioneerProfile(userId: string) {
    return pioneerRepository.findPioneerByUserId(userId);
  },
  async getPioneerProfileForUser(pioneerId: string) {
    return pioneerRepository.findPioneerById(pioneerId);
  },

  async getAllPioneers() {
    return pioneerRepository.findAllPioneers();
  },

  async updatePioneerProfile(userId: string, input: Partial<TPioneer>) {
    const existingPioneer = await pioneerRepository.findPioneerByUserId(userId);
    if (!existingPioneer) throw new Error("Profile not found");

    return pioneerRepository.updatePioneer(userId, input);
  },


  async getCurrentPioneerAvailableDaySession(userId: string, date: Date) {
    const startOfDayUTC = startOfDay(date).toISOString();
    const endOfDayUTC = endOfDay(date).toISOString();
    const pioneer = await pioneerRepository.findPioneerByUserId(userId);
    if (!pioneer) throw new Error("Could not find pioneer");
     return sessionService.getAvailableSessionsForDate(
      { startOfDay: startOfDayUTC, endOfDay: endOfDayUTC },
      pioneer.id,
    )
  },
  async getCurrentPioneerAvailableMonthSession(userId: string, date: Date) {
    const startOfDayUTC = startOfMonth(date).toISOString();
    const endOfDayUTC = endOfMonth(date).toISOString();
    const pioneer = await pioneerRepository.findPioneerByUserId(userId);

    if (!pioneer) throw new Error("Could not find pioneer");

    return sessionService.getAvailableSessionsForDate(
      { startOfDay: startOfDayUTC, endOfDay: endOfDayUTC },
      pioneer.id,
    );
  },

  // SECTION - user
  async getPioneerAvailableDaySession(pioneerId: string, date: Date) {
    const startOfDayUTC = startOfDay(date).toISOString();
    const endOfDayUTC = endOfDay(date).toISOString();
    const pioneer = await pioneerRepository.findPioneerById(pioneerId);

    if (!pioneer) throw new Error("Could not find pioneer");

    return sessionService.getAvailableSessionsForDate(
      { startOfDay: startOfDayUTC, endOfDay: endOfDayUTC },
      pioneer.id,
    );
  },
  async getPioneerAvailableMonthSession(pioneerId: string, date: Date) {
    const startOfDayUTC = startOfMonth(date).toISOString();
    const endOfDayUTC = endOfMonth(date).toISOString();
    const pioneer = await pioneerRepository.findPioneerById(pioneerId);

    if (!pioneer) throw new Error("Could not find pioneer");

    return sessionService.getAvailableSessionsForDate(
      { startOfDay: startOfDayUTC, endOfDay: endOfDayUTC },
      pioneer.id,
    );
  },
};
