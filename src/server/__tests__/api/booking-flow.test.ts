import { createCaller } from "@/server/api/root";
import { db } from "@/server/db";
import type { Session } from "next-auth";
import { BookingStatus, ERole } from "@prisma/client";
import { BookingService } from "@/server/api/services/booking.service";
import { SessionService } from "@/server/api/services/session.service";

jest.mock("@/server/db.ts", () => ({
  db: {
    availableSession: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
    bookedSession: {
      create: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
    },
    $transaction: jest.fn(async (callback) => callback({})),
  },
}));
const mockPioneerSession = {
  id: "session1",
  date: new Date(),
  time_zone: "UTC",
  available: true,
  pioneer_id: "pioneer1",
  version: 1,
};

jest.mock("@/server/api/services/session.service.ts", () => ({
  SessionService: {
    getPioneerAvailableDaySession: jest.fn(),
    findAvailableSessionById: jest.fn(() => {
      console.log("findAvailableSessionById called");
      return mockPioneerSession;
    }),
    markSessionAsUnavailable: jest.fn(),
  },
}));

jest.mock("@/server/api/services/booking.service.ts", () => ({
  BookingService: {
    bookSession: jest.fn(),
  },
}));

describe("Booking Flow Integration Tests", () => {
  const mockUserSession: Session = {
    user: {
      id: "user1",
      name: "user",
      role: ERole.USER,
      verified: true,
      email: "user@example.com",
    },
    expires: new Date().toISOString(),
  };

  const mockPioneerSession = {
    id: "session1",
    date: new Date(),
    time_zone: "UTC",
    available: true,
    pioneer_id: "pioneer1",
    version: 1,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Booking Creation", () => {
    it("should create a booking for an available session", async () => {
      (db.availableSession.findUnique as jest.Mock).mockResolvedValue(
        mockPioneerSession,
      );
      (db.bookedSession.create as jest.Mock).mockResolvedValue({
        id: "booking1",
        status: BookingStatus.PENDING,
        available_session_id: mockPioneerSession.id,
      });

      (BookingService.bookSession as jest.Mock).mockResolvedValue({
        status: BookingStatus.PENDING,
      });

      (SessionService.findAvailableSessionById as jest.Mock).mockResolvedValue(
        mockPioneerSession,
      );
      console.log("Mocking the findAvailableSessionById call");

      const caller = createCaller({ db, session: mockUserSession });

      const result = await caller.booking.bookSession({
        availableSessionId: "session1",
      });

      console.log("Expected function calls:");

      expect(BookingService.bookSession).toHaveBeenCalledWith(
        mockUserSession.user.id,
        "session1",
      );

      expect(result.status).toBe(BookingStatus.PENDING);
    });

    it("should not book a session if it's not available", async () => {
      const unavailableSession = { ...mockPioneerSession, available: false };

      (SessionService.findAvailableSessionById as jest.Mock).mockResolvedValue(
        unavailableSession,
      );

      (BookingService.bookSession as jest.Mock).mockImplementation(
        (userId, sessionId) => {
          if (!unavailableSession.available) {
            return null;
          }
          return {
            status: BookingStatus.PENDING,
          };
        },
      );

      const caller = createCaller({ db, session: mockUserSession });

      const result = await caller.booking.bookSession({
        availableSessionId: "session1",
      });

      expect(result).toBeNull();
      expect(db.bookedSession.create).not.toHaveBeenCalled();
      expect(BookingService.bookSession).toHaveBeenCalled();
    });
  });
});
