const express = require('express');
const db = require('../config/db');
const router = express.Router();

// Voir toutes les commandes
router.get('/orders', (req, res) => {
  db.all('SELECT * FROM Orders', [], (err, orders) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(orders);
  });
});

// Voir les items d’une commande
router.get('/orders/:order_id/items', (req, res) => {
  db.all('SELECT * FROM OrderItems WHERE order_id = ?', [req.params.order_id], (err, items) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(items);
  });
});

module.exports = router;