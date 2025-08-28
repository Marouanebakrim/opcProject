const db = require('../config/db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS Products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      price REAL NOT NULL,
      stock INTEGER DEFAULT 0,
      image_url TEXT,
      category TEXT,
      brand TEXT,
      rating REAL DEFAULT 0,
      review_count INTEGER DEFAULT 0,
      discount_percent INTEGER DEFAULT 0,
      is_featured BOOLEAN DEFAULT 0,
      is_new BOOLEAN DEFAULT 0,
      is_bestseller BOOLEAN DEFAULT 0,
      color TEXT,
      weight REAL,
      dimensions TEXT,
      tags TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

module.exports = db;