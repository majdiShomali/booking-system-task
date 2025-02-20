import { Server } from 'socket.io';
import http from 'http';
import { BookingService } from './api/services/booking.service';


const cleanUp = () => {
  io.close(() => {
    console.log('Socket.IO server closed.');
  });
};

const server = http.createServer();
export const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

process.on('SIGINT', () => {
  console.log('Closing Socket.IO server due to app termination...');
  cleanUp();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('Closing Socket.IO server due to app termination...');
  cleanUp();
  process.exit(0);
});


io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('book_session', async (data) => {
    const booking = await BookingService.bookSession(data.userId, data.availableSessionId);
    socket.broadcast.emit('session_booked', { sessionId: data.availableSessionId, status: 'booked' });
    socket.emit('booking_confirmation', booking);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server
server.listen(5555, () => {
  console.log('Socket.IO server running on http://localhost:5555');
});
