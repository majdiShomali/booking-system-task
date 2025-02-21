import { Server } from "socket.io";
import http from "http";

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Socket.IO server is running");
});
export const io = new Server(server, {
  cors: {
    origin: process.env.NEXT_PUBLIC_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");


  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Start the server
const PORT = Number(process.env.NEXT_PUBLIC_SOCKET_PORT ?? '5555');
server.listen(PORT, "0.0.0.0", () => {
  console.log(`Socket.IO server running on http://${process.env.NEXT_PUBLIC_HOST}:${PORT}`);
});

