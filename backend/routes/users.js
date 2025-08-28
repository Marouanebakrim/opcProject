const express = require('express');
const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

const JWT_SECRET = 'ocp_secret'; // À sécuriser en prod

// Inscription
router.post('/signup', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ error: 'Champs requis' });
  db.get('SELECT * FROM Users WHERE email = ?', [email], (err, user) => {
    if (user) return res.status(400).json({ error: 'Email déjà utilisé' });
    const hash = bcrypt.hashSync(password, 10);
    db.run('INSERT INTO Users (name, email, password) VALUES (?, ?, ?)', [name, email, hash], function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID });
    });
  });
});

// Connexion
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  db.get('SELECT * FROM Users WHERE email = ?', [email], (err, user) => {
    if (!user) return res.status(400).json({ error: 'Utilisateur non trouvé' });
    if (!bcrypt.compareSync(password, user.password)) return res.status(400).json({ error: 'Mot de passe incorrect' });
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ 
      token, 
      user: { 
        id: user.id, 
        name: user.name, 
        email: user.email, 
        is_admin: user.is_admin 
      } 
    });
  });
});

module.exports = router;