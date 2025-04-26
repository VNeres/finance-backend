const Database = require('better-sqlite3');

const db = new Database('finance.db');

db.prepare(`
  CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    amount REAL,
    type TEXT,
    category TEXT,
    date TEXT
  )
`).run();

module.exports = db;