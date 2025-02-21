import { createCaller } from "@/server/api/root";
import { SessionService } from "@/server/api/services/session.service";
import { db } from "@/server/db";

import type { Session } from "next-auth";

jest.mock("@/server/db.ts", () => ({
  db: {
    availableSession: {
      findMany: jest.fn(),
    },
  },
}));

jest.mock("@/server/api/services/session.service.ts", () => ({
  SessionService: {
    getPioneerAvailableDaySession: jest.fn(),
  },
}));

describe("Booking API Unit Tests", () => {
  it("should return a booking by ID", async () => {

    (SessionService.getPioneerAvailableDaySession as jest.Mock).mockResolvedValue([
      {
        id: "123",
        userId: "user1",
        status: "confirmed",
      },
    ]);


    const mockCtx = {
      db, 
      session: { user: { id: "user1" }, expires: new Date().toISOString() } as Session,
    };

    const caller = createCaller(mockCtx); 
    const booking = await caller.session.getCurrentPioneerAvailableDaySession({
      date: new Date().toISOString(),
      pioneer_id: "1",
    });

    expect(booking).toEqual([
      {
        id: "123",
        userId: "user1",
        status: "confirmed",
      },
    ]);
  });
});
