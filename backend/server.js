// backend/server.js
const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors()); // Allow frontend requests
app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// GET: Fetch all breaks
app.get('/api/breaks', (req, res) => {
  db.all('SELECT * FROM breaks', (err, rows) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json(rows);
  });
});

// POST: Add a new break
app.post('/api/breaks', (req, res) => {
  const { initial, firstTen, thirty, secondTen } = req.body;
  db.run(
    'INSERT INTO breaks (initial, firstTen, thirty, secondTen) VALUES (?, ?, ?, ?)',
    [initial, firstTen, thirty, secondTen],
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

//UPDATE: edit a break
app.put('/api/breaks/:id', (req, res) => {
    const { initial, firstTen, thirty, secondTen } = req.body;
    const { id } = req.params;
    
    if (!id || isNaN(id)) {
        return res.status(400).json({ error: 'Invalid break ID' });
    }
    
    db.run(
        'UPDATE breaks SET initial = ?, firstTen = ?, thirty = ?, secondTen = ? WHERE id = ?', 
        [initial, firstTen, thirty, secondTen, id], 
        function(err) { 
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (this.changes === 0) {
                return res.status(404).json({ error: 'Break not found' });
            }
            res.json({ 
                success: true,
                changes: this.changes
            });
        }
    );
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Node.js backend running on http://localhost:${PORT}`);
});