import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.NODE_ENV === 'production' 
      ? 'https://hedonia-game.netlify.app'  // Votre URL Netlify
      : "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(join(__dirname, '../dist')));
}

// Socket.io logic (votre code existant)
const rooms = new Map();

const generateRoomCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('createRoom', ({ playerName }) => {
    const roomCode = generateRoomCode();
    rooms.set(roomCode, {
      players: [{ id: socket.id, name: playerName }],
      host: socket.id,
      gameStarted: false,
      currentMode: 'classic',
      scores: { [playerName]: 0 }
    });
    
    socket.join(roomCode);
    socket.emit('roomCreated', roomCode);
    io.to(roomCode).emit('playerJoined', rooms.get(roomCode).players);
    console.log(`Room created: ${roomCode} by ${playerName}`);
  });

  // Rest of your socket.io code...
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});