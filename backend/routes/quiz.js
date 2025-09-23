// backend/routes/quiz.js
const express = require('express');
const router = express.Router();

// small sample questions
const questions = [
  { _id: 'q1', question: 'Which uses less water?', options: ['Shower','Bath','Both'], correct: 'Shower', points: 5 },
  { _id: 'q2', question: 'Which is recyclable?', options: ['Glass','Sand','Soil'], correct: 'Glass', points: 5 }
];

router.get('/random', (req, res) => {
  const q = questions[Math.floor(Math.random() * questions.length)];
  // send without 'correct' so client can't cheat
  const { correct, ...publicQ } = q;
  res.json({ ...publicQ, options: q.options, _id: q._id });
});

router.post('/answer', (req, res) => {
  const { id, answer } = req.body;
  const q = questions.find(x => x._id === id);
  if (!q) return res.status(404).json({ error: 'Question not found' });

  const correct = q.correct === answer;
  res.json({ correct, points: correct ? q.points : 0 });
});

module.exports = router;
