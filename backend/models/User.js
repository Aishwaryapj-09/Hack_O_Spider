const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  points: { type: Number, default: 0 },
  trees: [{ type: String }], // AR trees user has earned
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
