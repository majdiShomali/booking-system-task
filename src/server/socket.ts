import { Server } from "socket.io";
import http from "http";
import { exec } from "child_process";
// import { BookingService } from "./api/services/booking.service";
// import { BookingStatus } from "@prisma/client";

const server = http.createServer();

export const io = new Server(server, {
  cors: {
    origin: process.env.NEXT_PUBLIC_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const cleanUp = async () => {
  try {
    console.log("Closing Socket.IO server...");
    await new Promise<void>((resolve) => {
      io.close(() => resolve());
    });
    console.log("Socket.IO server closed.");

    await new Promise<void>((resolve, reject) => {
      server.close((err) => (err ? reject(err) : resolve()));
    });
    console.log("HTTP server closed.");

    process.exit(0);
  } catch (error) {
    console.error("Error during cleanup:", error);
    process.exit(1);
  }
};

const handleSignal = async (signal: string) => {
  console.log(`Received ${signal} signal. Closing server...`);
  await cleanUp();
};

// Use an inline wrapper function to handle the promise correctly
process.on("SIGINT", () => {
  handleSignal("SIGINT").catch((error) => {
    console.error("Error handling SIGINT:", error);
    process.exit(1);
  });
});

process.on("SIGTERM", () => {
  handleSignal("SIGTERM").catch((error) => {
    console.error("Error handling SIGTERM:", error);
    process.exit(1);
  });
});

io.on("connection", (socket) => {
  console.log("A user connected");

  // socket.on("book_session", async (data) => {
  //   try {
  //     const booking = await BookingService.bookSession(
  //       data.userId,
  //       data.availableSessionId,
  //     );
  //     socket.broadcast.emit("session_booked", {
  //       id: data.availableSessionId,
  //       status: BookingStatus.PENDING,
  //       available: false,
  //     });
  //     socket.emit("booking_confirmation", booking);
  //   } catch (error) {
  //     console.error("Error booking session:", error);
  //     socket.emit("booking_error", { message: "Failed to book session" });
  //   }
  // });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Start the server
const PORT = Number(process.env.NEXT_PUBLIC_SOCKET_PORT ?? '5555');
server.listen(PORT, "0.0.0.0", () => {
  console.log(`Socket.IO server running on ${process.env.NEXT_PUBLIC_URL}${PORT}`);
});

// Handle address in use error
server.on("error", (e: { code: string }) => {
  if (e?.code === "EADDRINUSE") {
    console.log(
      `Port ${PORT} is already in use. Trying to kill the process...`,
    );

    const killProcessOnPort = (port: number) => {
      exec(
        `lsof -i :${port} | grep LISTEN | awk '{print $2}' | xargs kill -9`,
        (err) => {
          if (err) {
            console.error(`Failed to kill process on port ${port}:`, err);
          } else {
            console.log(`Killed process running on port ${port}`);
            server.listen(PORT, "0.0.0.0");
          }
        },
      );
    };

    killProcessOnPort(PORT);
  } else {
    console.error("Server error:", e);
  }
});
