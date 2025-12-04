const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const http = require("http");
const { Server } = require("socket.io");

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app); 

// Initialize Socket.IO server
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://hack-verse-sr.vercel.app",
      "https://hack-versee.vercel.app"
    ],
    methods: ["GET", "POST"],
    credentials: true
  }
});

// ---------------- SOCKET.IO ------------------

let onlineUsers = {};

// Socket.IO connection handling
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("register", (userId) => {
    onlineUsers[userId] = socket.id;
    console.log("User registered:", userId);
  });

socket.on("send-message", ({ conversationId, receiverId, text, senderId }) => {
  const receiverSocket = onlineUsers[receiverId];

  // 🔥 Send to receiver (leader/member)
  if (receiverSocket) {
    io.to(receiverSocket).emit("receive-message", {
      conversationId,
      text,
      senderId
    });
  }

  // 🔥 Also send back to sender (for realtime without refresh)
  const senderSocket = onlineUsers[senderId];
  if (senderSocket) {
    io.to(senderSocket).emit("receive-message", {
      conversationId,
      text,
      senderId
    });
  }
});


  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});


const corsOptions = {
  origin: [
    'http://localhost:5173',
    'https://hack-verse-sr.vercel.app',
     'https://hack-versee.vercel.app'
  ],
  credentials: true,
};


app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/requirements', require('./routes/requirementRoutes'));
app.use("/api/chat", require("./routes/chatRoutes"));
app.use('/api/ideas', require("./routes/ideaRoutes"));
app.use('/api/notifications', require('./routes/notificationRoutes'));
const PORT = process.env.PORT || 5000 ;

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server + Socket.io running on http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
  res.send('API is Running...');
});

module.exports = app;