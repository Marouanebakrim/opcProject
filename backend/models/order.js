const db = require('../config/db');

db.run(`CREATE TABLE IF NOT EXISTS Orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  total_price REAL,
  order_date TEXT,
  FOREIGN KEY(user_id) REFERENCES Users(id)
)`);

module.exports = {};