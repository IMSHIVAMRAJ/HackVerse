const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
 
// Load env variables
dotenv.config();
 
// Connect to MongoDB
connectDB();
 
// Init app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/requirements', require('./routes/requirementRoutes'));

// Base route
app.get('/', (req, res) => { 
  res.send('API is Running...');
});

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));


