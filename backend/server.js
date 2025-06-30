// backend/server.js
const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors()); // Allow frontend requests
app.use(express.json());

// GET: Fetch all breaks
app.get('/api/breaks', (req, res) => {
  db.all('SELECT * FROM breaks', (err, rows) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json(rows);
  });
});

// POST: Add a new break
app.post('/api/breaks', (req, res) => {
  const { initial, startTime, endTime } = req.body;
  db.run(
    'INSERT INTO breaks (initial, startTime, endTime) VALUES (?, ?, ?)',
    [initial, startTime, endTime],
    (err) => {
      if (err) res.status(500).json({ error: err.message });
      else res.json({ success: true });
    }
  );
});

// DELETE: Remove a break
app.delete('/api/breaks/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM breaks WHERE id = ?', [id], (err) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json({ success: true });
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Node.js backend running on http://localhost:${PORT}`);
});