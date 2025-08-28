const express = require('express');
const db = require('../config/db');
const { requireAuth, requireAdmin } = require('../middleware/auth');const router = express.Router();

// GET all products with optional filters
router.get('/', (req, res) => {
  let sql = 'SELECT * FROM Products';
  const params = [];
  const filters = [];

  if (req.query.category) {
    filters.push('category = ?');
    params.push(req.query.category);
  }
  if (req.query.minPrice) {
    filters.push('price >= ?');
    params.push(req.query.minPrice);
  }
  if (req.query.maxPrice) {
    filters.push('price <= ?');
    params.push(req.query.maxPrice);
  }

  if (filters.length) {
    sql += ' WHERE ' + filters.join(' AND ');
  }

  db.all(sql, params, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// GET product by id
router.get('/:id', (req, res) => {
  db.get('SELECT * FROM Products WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Produit non trouvé' });
    res.json(row);
  });
});

// POST create product (admin only)
router.post('/', requireAuth, requireAdmin, (req, res) => {
  const { name, description, price, stock, image_url, category } = req.body;
  db.run(
    'INSERT INTO Products (name, description, price, stock, image_url, category) VALUES (?, ?, ?, ?, ?, ?)',
    [name, description, price, stock, image_url, category],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID });
    }
  );
});

// PUT update product (admin only)
router.put('/:id', requireAuth, requireAdmin, (req, res) => {
  const { name, description, price, stock, image_url, category } = req.body;
  db.run(
    'UPDATE Products SET name=?, description=?, price=?, stock=?, image_url=?, category=? WHERE id=?',
    [name, description, price, stock, image_url, category, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ updated: this.changes });
    }
  );
});

// DELETE product (admin only)
router.delete('/:id', requireAuth, requireAdmin, (req, res) => {
  db.run('DELETE FROM Products WHERE id=?', [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

module.exports = router;
