// backend/db.js
const sqlite3 = require('sqlite3').verbose();

// Open or create SQLite database
const db = new sqlite3.Database('./data/breaks.db', (err) => {
  if (err) console.error('Database error:', err);
  else console.log('Connected to SQLite database');
});

// Initialize table
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS breaks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      initial TEXT NOT NULL,
      firstTen TEXT NOT NULL,
      thirty TEXT NOT NULL,
      secondTen TEXT NOT NULL
    )
  `);
  db.run(`
    INSERT INTO breaks (initial, firstTen, thirty, secondTen)
    VALUES ("AS", "11:40", "18:00", "19:50")
  `);
});

module.exports = db;