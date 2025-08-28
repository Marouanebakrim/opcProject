const express = require('express');
const db = require('../config/db');
const router = express.Router();

// Créer une commande
router.post('/', (req, res) => {
  const { user_id, items, total_price } = req.body;
  if (!user_id || !items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Données de commande invalides' });
  }
  const order_date = new Date().toISOString();
  db.run('INSERT INTO Orders (user_id, total_price, order_date) VALUES (?, ?, ?)', [user_id, total_price, order_date], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    const orderId = this.lastID;
    // Insérer les items
    const stmt = db.prepare('INSERT INTO OrderItems (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)');
    items.forEach(item => {
      stmt.run(orderId, item.product_id, item.quantity, item.price);
      // Mettre à jour le stock
      db.run('UPDATE Products SET stock = stock - ? WHERE id = ?', [item.quantity, item.product_id]);
    });
    stmt.finalize();
    res.status(201).json({ order_id: orderId });
  });
});

// Voir les commandes d’un utilisateur
router.get('/user/:user_id', (req, res) => {
  db.all('SELECT * FROM Orders WHERE user_id = ?', [req.params.user_id], (err, orders) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(orders);
  });
});

module.exports = router;