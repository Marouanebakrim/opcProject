const db = require('../config/db');

db.run(`CREATE TABLE IF NOT EXISTS OrderItems (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id INTEGER,
  product_id INTEGER,
  quantity INTEGER,
  price REAL,
  FOREIGN KEY(order_id) REFERENCES Orders(id),
  FOREIGN KEY(product_id) REFERENCES Products(id)
)`);

module.exports = {};