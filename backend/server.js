// backend/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Initialize app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors()); // Allow frontend (localhost:5173) to call backend
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/actions', require('./routes/actions'));
app.use('/api/impact', require('./routes/impact'));       // 🌍 Global impact totals
app.use('/api/stats', require('./routes/stats'));         // 🏆 Achievements / user stats
app.use('/api/challenge', require('./routes/challenge')); // 🎯 Daily challenge
app.use('/api/quiz', require('./routes/quiz'));           // ❓ Eco quiz

// Health check
app.get('/', (req, res) => {
  res.send('🌱 Sustainable AR backend is running!');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server started on port ${PORT}`));
