// backend/routes/stats.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
// Optional: protect this route with auth middleware if you have it

// GET /api/stats/my
router.get('/my', async (req, res) => {
  try {
    // If you have auth middleware set req.userId, use that. Otherwise: demo using query or first user.
    const userId = req.userId || req.query.userId; // prefer auth, fallback query param
    if (!userId) return res.status(400).json({ error: 'userId required (or use auth)' });

    const user = await User.findById(userId).lean();
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json({
      trees: user.treesPlanted || 0,
      treesGoal: 10,
      bottles: user.reuseBottle || 0,
      bottlesGoal: 20,
      electricity: user.saveElectricity || 0,
      electricityGoal: 5
    });
  } catch (err) {
    console.error('Stats error:', err);
    res.status(500).json({ error: 'Failed to load user stats' });
  }
});

module.exports = router;

