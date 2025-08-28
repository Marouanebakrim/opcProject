const jwt = require('jsonwebtoken');
const db = require('../config/db');

const JWT_SECRET = process.env.JWT_SECRET || 'ocp_secret';

// Middleware pour vérifier l'authentification
function requireAuth(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token manquant' });
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Token invalide' });
    // On récupère l'utilisateur en base pour avoir is_admin
    db.get('SELECT * FROM Users WHERE id = ?', [decoded.id], (err, user) => {
      if (err || !user) return res.status(401).json({ error: 'Utilisateur non trouvé' });
      req.user = user;
      next();
    });
  });
}

// Middleware pour vérifier que l'utilisateur est admin
function requireAdmin(req, res, next) {
  // On suppose que requireAuth a déjà été appelé
  if (!req.user) return res.status(401).json({ error: 'Non authentifié' });
  if (!req.user.is_admin) return res.status(403).json({ error: 'Accès admin requis' });
  next();
}

module.exports = { requireAuth, requireAdmin };
