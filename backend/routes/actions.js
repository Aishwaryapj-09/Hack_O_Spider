const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Action = require('../models/Action');
const User = require('../models/User');

// POST /api/actions/complete
router.post('/complete', auth, async (req, res) => {
  const { type, proof } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(400).json({ msg: 'User not found' });

    const points = (type === 'plant_tree') ? 50 : 10;
    const action = new Action({ user: user.id, type, proof, points });
    await action.save();

    // Award points immediately
    user.points += points;
    if (type === 'plant_tree') user.trees.push('treeModel1');
    await user.save();

    res.json({ msg: 'Action recorded', action, user: { points: user.points, trees: user.trees } });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// GET /api/actions/leaderboard
router.get('/leaderboard', async (req, res) => {
  try {
    const top = await User.find().sort({ points: -1 }).limit(10).select('name points');
    res.json(top);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
