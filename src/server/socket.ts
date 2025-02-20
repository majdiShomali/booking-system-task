import { Server } from 'socket.io';
import http from 'http';
import { BookingService } from './api/services/booking.service';

const server = http.createServer();

export const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const cleanUp = () => {
  console.log('Closing Socket.IO server...');
  io.close(() => {
    console.log('Socket.IO server closed.');
    server.close(() => {
      console.log('HTTP server closed.');
      process.exit(0); 
    });
  });
};

process.on('SIGINT', () => {
  console.log('Received SIGINT signal. Closing server...');
  cleanUp();
});

process.on('SIGTERM', () => {
  console.log('Received SIGTERM signal. Closing server...');
  cleanUp();
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('book_session', async (data) => {
    try {
      const booking = await BookingService.bookSession(data.userId, data.availableSessionId);
      socket.broadcast.emit('session_booked', { sessionId: data.availableSessionId, status: 'booked' });
      socket.emit('booking_confirmation', booking);
    } catch (error) {
      console.error('Error booking session:', error);
      socket.emit('booking_error', { message: 'Failed to book session' });
    }
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server
const PORT = 5555;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Socket.IO server running on http://localhost:${PORT}`);
});

// Handle address in use error
server.on('error', (e:{code:string}) => {
  if (e?.code === 'EADDRINUSE') {
    console.log(`Port ${PORT} is already in use. Trying to kill the process...`);
    const killPort = require('kill-port');
    killPort(PORT)
      .then(() => {
        console.log(`Port ${PORT} has been freed. Restarting server...`);
        server.listen(PORT, '0.0.0.0');
      })
      .catch((err:Error) => {
        console.error('Failed to kill port:', err);
      });
  } else {
    console.error('Server error:', e);
  }
});