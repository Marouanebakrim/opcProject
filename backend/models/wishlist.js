const db = require('../config/db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS Wishlist (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      product_id INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES Users (id) ON DELETE CASCADE,
      FOREIGN KEY (product_id) REFERENCES Products (id) ON DELETE CASCADE,
      UNIQUE(user_id, product_id)
    )
  `);
});

module.exports = db;
