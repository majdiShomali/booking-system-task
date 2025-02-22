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

jest.mock("@/server/socket", () => {
  const httpServer = {
    listen: jest.fn(),
    close: jest.fn(),
  };
  return {
    httpServer,
    io: {
      on: jest.fn(),
    },
  };
});

describe("Booking API Unit Tests", () => {
  const date = new Date();
  it("should return available pioneer sessions within a date range", async () => {
    (SessionService.getPioneerAvailableDaySession as jest.Mock).mockResolvedValue([
      {
        id: "123",
        date: date.toISOString(),
        time_zone: "UTC",
        available: true,
        pioneer_id: "1",
      },
    ]);

    const mockCtx = {
      db,
      session: { user: { id: "user1" }, expires: new Date().toISOString() } as Session,
    };

    const caller = createCaller(mockCtx);
    const availableSessions = await caller.session.getCurrentPioneerAvailableDaySession({
      date: new Date().toISOString(),
      pioneer_id: "1",
    });

    expect(availableSessions).toEqual([
      {
        id: "123",
        date: date.toISOString(),
        time_zone: "UTC",
        available: true,
        pioneer_id: "1",
      },
    ]);
  });
});