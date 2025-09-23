// backend/routes/challenge.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Simple in-memory challenges (replace with DB if you want)
const challenges = [
  { id: 1, text: 'Use a reusable bottle today', points: 10 },
  { id: 2, text: 'Take public transport once', points: 20 },
  { id: 3, text: 'Switch off lights for one hour', points: 5 }
];

// GET /api/challenge/today
router.get('/today', (req, res) => {
  const idx = (new Date()).getDate() % challenges.length;
  res.json(challenges[idx]);
});

// POST /api/challenge/complete
router.post('/complete', async (req, res) => {
  try {
    // require auth or token => here we expect req.userId set by middleware or userId in body for quick test
    const userId = req.userId || req.body.userId;
    if (!userId) return res.status(400).json({ error: 'userId required' });

    const today = challenges[(new Date()).getDate() % challenges.length];
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // credit points to user (you may want to prevent repeat credits — left simple)
    user.points = (user.points || 0) + (today.points || 0);
    // Optionally increment counters, e.g. user.save()
    await user.save();

    res.json({ ok: true, pointsAdded: today.points, user: { _id: user._id, points: user.points } });
  } catch (err) {
    console.error('Challenge complete error:', err);
    res.status(500).json({ error: 'Failed to mark challenge complete' });
  }
});

module.exports = router;
