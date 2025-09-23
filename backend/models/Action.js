const mongoose = require('mongoose');

const ActionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true }, // e.g., "plant_tree"
  proof: { type: String }, // optional image URL
  points: { type: Number, default: 10 },
  verified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Action', ActionSchema);
