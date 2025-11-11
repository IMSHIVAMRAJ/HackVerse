const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

const corsOptions = {
  origin: [
    'http://localhost:5173',
    'https://hack-verse-sr.vercel.app',
     'https://hack-versee.vercel.app'
  ],
  credentials: true,
  optionsSuccessStatus: 200 // For legacy browser support
};


app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/requirements', require('./routes/requirementRoutes'));

app.get('/', (req, res) => {
  res.send('API is Running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
module.exports = app;