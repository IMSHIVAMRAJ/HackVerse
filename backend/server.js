// server.js
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const http = require("http");
const { Server } = require("socket.io");
const mentorsRoute = require('./routes/mentors');
const slotsRoute = require('./routes/slots');
const bookingsRoute = require('./routes/bookings');
const paymentsRoute = require('./routes/payments');
const mentorsAuthRoute = require('./routes/mentorsAuth');

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
    // Optional: remove from onlineUsers (if you store mapping by userId + socket)
    // for (const [uid, sid] of Object.entries(onlineUsers)) {
    //   if (sid === socket.id) delete onlineUsers[uid];
    // }
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

/**
 * ----------------------------
 *  NEW: Idea validation endpoint
 *  POST /api/idea/validate
 *  body: { idea: "<user idea text>" }
 * ----------------------------
 *
 * Uses @google/genai (Gemini) SDK via dynamic import so this file can remain CommonJS.
 * Make sure: npm i @google/genai
 * .env must contain GEMINI_API_KEY and optionally GEMINI_MODEL
 */
app.post('/api/idea/validate', async (req, res) => {
  try {
    const { idea } = req.body;
    if (!idea || typeof idea !== 'string' || idea.trim().length < 5) {
      return res.status(400).json({ error: 'Idea text required (min 5 chars)' });
    }

    // dynamic import so we can keep CommonJS style for rest of project
    const { GoogleGenAI } = await import('@google/genai');

    if (!process.env.GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY missing in .env");
      return res.status(500).json({ error: "Server misconfigured: GEMINI_API_KEY missing" });
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash-lite';

    // The system instruction enforces STRICT JSON output
    const systemInstruction = `
You are an expert startup idea evaluator.

Your job:
1. Give an overall score (0–10) considering feasibility, innovation, market potential, team requirement, and technical complexity.
2. Recommend a suitable tech stack.
3. Provide a short, clear summary of what can be built.
4. Provide 3-6 actionable suggestions / next steps.

STRICT RULES:

Return ONLY this JSON format (no backticks, no extra text):

{
  "score": 0,
  "breakdown": {
    "feasibility": 0,
    "novelty": 0,
    "marketPotential": 0,
    "technicalComplexity": 0
  },
  "techStack": [],
  "summary": "",
  "suggestions": []
}

GUIDELINES:

• score → integer 0–10  
• breakdown → each value integer 0–10  
• techStack → 5–10 short strings (e.g., "React", "Node.js", "MongoDB")  
• summary → 3–5 short sentences  
• suggestions → 3–6 actionable short items (<= 20 words each)  
• If ANY field can't be understood → set its value to null.

Return STRICT JSON only.
`;

    // call model
    const response = await ai.models.generateContent({
      model: MODEL,
      contents: [
        {
          role: 'user',
          parts: [{ text: idea }]
        }
      ],
      config: {
        systemInstruction
      },
      generationConfig: {
        responseMimeType: "application/json"
      }
    });

    // SDK commonly exposes `response.text` as the generated string
    let text = response?.text ?? JSON.stringify(response);

    // Cleanup common wrappers (```json, backticks, "json " prefixes)
    text = text.replace(/```json/gi, "").replace(/```/g, "").replace(/^json\s*/i, "").trim();

    // If not starting with { try to extract JSON substring
    if (!text.startsWith('{')) {
      const m = text.match(/\{[\s\S]*\}/);
      if (m) text = m[0];
    }

    // Parse JSON or return raw for debugging
    try {
      const parsed = JSON.parse(text);
      return res.json({ result: parsed });
    } catch (parseErr) {
      console.warn('Could not parse Gemini output as JSON. Returning raw text for debugging.');
      return res.status(200).json({ raw: text, warning: 'Could not parse JSON from model' });
    }
  } catch (err) {
    console.error("Idea validation error:", err);
    return res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// existing routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/requirements', require('./routes/requirementRoutes'));
app.use("/api/chat", require("./routes/chatRoutes"));
app.use('/api/ideas', require("./routes/ideaRoutes"));
app.use('/api/notifications', require("./routes/notificationRoutes"));
app.use('/api/mentors', mentorsRoute);
app.use('/api/slots', slotsRoute);
app.use('/api/bookings', bookingsRoute);
// payments route includes webhook with raw body on its specific path
app.use('/api/payments', paymentsRoute);
app.use('/api/mentors/auth', mentorsAuthRoute);
const PORT = process.env.PORT || 5000 ;

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server + Socket.io running on http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
  res.send('API is Running...');
});

module.exports = app;
