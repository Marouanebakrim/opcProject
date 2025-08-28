const db = require('../config/db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS Reviews (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id INTEGER NOT NULL,
      user_id INTEGER NOT NULL,
      rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
      comment TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (product_id) REFERENCES Products (id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES Users (id) ON DELETE CASCADE
    )
  `);
});

module.exports = db;
