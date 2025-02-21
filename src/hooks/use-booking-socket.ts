import timeHelper from "@/helpers/time.helper";
import { api } from "@/utils/api";
import type { AvailableSession } from "@prisma/client";
import { useEffect, useState } from "react";
import io from "socket.io-client";

const useBookingSocket = (pioneerId: string, selectedDate: Date) => {
  const [socket, setSocket] = useState<SocketIOClient.Socket | null>(null);
  const [sessionStatus, setSessionStatus] = useState<string | null>(null);
  const [availableSession, setAvailableSessions] = useState<
    AvailableSession[] | null
  >(null);

  const { data: pioneerAvailableSession, isLoading: isSessionLoading } =
    api.session.getCurrentPioneerAvailableDaySession.useQuery(
      {
        date: timeHelper.toUTCDate(selectedDate)?.toISOString(),
        pioneer_id: pioneerId,
      },
      { enabled: Boolean(selectedDate && pioneerId) },
    );

  useEffect(() => {
    setAvailableSessions(pioneerAvailableSession ?? []);
  }, [pioneerAvailableSession]);

  useEffect(() => {
    if (pioneerId && selectedDate) {
      const socketIo = io(
        process.env.NEXT_PUBLIC_SOCKET_URL ?? "http://localhost:5555",
      );

      socketIo.on("connect", () => {
        console.log("Connected to Socket.IO server 🪧");
      });

      socketIo.on("session_booked", (data: AvailableSession) => {
        setSessionStatus(`Session ${data.id} has been booked!`);
        setAvailableSessions((prev) => {
          const prevSessions = prev? [...prev] : [];
          return prevSessions?.map((prevSession) => {
            
            if (prevSession.id === data.id) {
  
              return {...prevSession, available: false };
            }
            return prevSession;
          })
        });
      });

      socketIo.on("booking_confirmation", (booking: AvailableSession) => {
        console.log("Booking confirmed:", booking);
      });

      setSocket(socketIo);

      return () => {
        socketIo.off("session_booked");
        socketIo.off("booking_confirmation");
        socketIo.disconnect();
      };
    }
  }, [pioneerId, selectedDate,availableSession]);

  return { socket, sessionStatus, availableSession, isSessionLoading };
};

export default useBookingSocket;
