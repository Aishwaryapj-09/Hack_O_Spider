// backend/routes/impact.js
const express = require('express');
const router = express.Router();
const User = require('../models/User'); // adjust path if needed

// GET /api/impact/totals
router.get('/totals', async (req, res) => {
  try {
    const agg = await User.aggregate([
      {
        $group: {
          _id: null,
          trees: { $sum: { $ifNull: ["$treesPlanted", 0] } },
          bottles: { $sum: { $ifNull: ["$reuseBottle", 0] } },
          energy: { $sum: { $ifNull: ["$saveElectricity", 0] } }
        }
      }
    ]);

    const t = agg[0] || { trees: 0, bottles: 0, energy: 0 };
    res.json({ trees: t.trees, bottles: t.bottles, energy: t.energy });
  } catch (err) {
    console.error('Impact error:', err);
    res.status(500).json({ error: 'Failed to load impact totals' });
  }
});

module.exports = router;
