# Rapport de stage – Plateforme e-commerce OCP

## 1. Contexte du projet
Ce projet est une API e-commerce pédagogique développée en Node.js/Express avec une base de données SQLite. Il expose des endpoints permettant la gestion des utilisateurs, des produits, des commandes et un accès de visualisation côté administrateur. Le frontend n’est pas encore implémenté dans ce dépôt.

## 2. Architecture et technologies
- Backend: Express 5, CORS, JSON Web Token (JWT), bcryptjs
- Base de données: SQLite (fichier `ocp_ecommerce.db`)
- Organisation des dossiers:
  - `backend/server.js`: point d’entrée serveur
  - `backend/routes/*`: routes produits, utilisateurs, commandes, admin
  - `backend/config/db.js`: connexion SQLite
  - `backend/middleware/auth.js`: middleware `requireAuth` et `requireAdmin`
  - `backend/init-db.js`: script d’initialisation du schéma

## 3. Mise en place locale
1. Se placer dans le dossier `backend` et installer les dépendances:
   ```bash
   cd backend
   npm ci
   ```
2. Lancer l’API:
   ```bash
   node server.js
   ```
3. L’API écoute sur `http://localhost:5000`.

Optionnel: définir un secret JWT personnalisé
```bash
export JWT_SECRET="votre_secret"
node server.js
```

## 4. Schéma de base de données (extrait)
- `Users(id, name, email unique, password hash, is_admin, created_at)`
- `Products(id, name, description, price, stock, image_url, category, brand, rating, review_count, discount_percent, is_featured, is_new, is_bestseller, color, weight, dimensions, tags, created_at, updated_at)`
- `Orders(id, user_id, total_amount, status, created_at)`
- `OrderItems(id, order_id, product_id, quantity, price)`
- `Reviews(id, product_id, user_id, rating 1..5, comment, created_at)`
- `Wishlist(id, user_id, product_id, created_at)`

## 5. Endpoints principaux
- Produits
  - `GET /api/products` (filtres: `category`, `minPrice`, `maxPrice`)
  - `GET /api/products/:id`
  - `POST /api/products` (auth + admin)
  - `PUT /api/products/:id` (auth + admin)
  - `DELETE /api/products/:id` (auth + admin)
- Utilisateurs
  - `POST /api/users/signup`
  - `POST /api/users/login`
- Commandes
  - `POST /api/orders`
  - `GET /api/orders/user/:user_id`
- Admin
  - `GET /api/admin/orders`
  - `GET /api/admin/orders/:order_id/items`

## 6. Sécurité et authentification
- Authentification par JWT: en-tête `Authorization: Bearer <token>`.
- `requireAuth` vérifie la validité du token et charge l’utilisateur.
- `requireAdmin` limite certaines opérations (CRUD produits) aux administrateurs.
- Recommandation: définir `JWT_SECRET` via variable d’environnement et ne pas commiter de secret par défaut.

## 7. Procédure de test rapide
Vérifier disponibilité API:
```bash
curl http://localhost:5000/
```
Lister les produits:
```bash
curl http://localhost:5000/api/products
```
Inscription:
```bash
curl -X POST http://localhost:5000/api/users/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","password":"pass1234"}'
```
Connexion:
```bash
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"pass1234"}'
```

## 8. Résultats obtenus pendant le stage
- Mise en route du backend et validation des endpoints produits et racine.
- Vérification de la connexion SQLite et de la présence de données d’exemple.
- Documentation des endpoints et de la structure des données.

## 9. Propositions d’amélioration
- Ajouter des scripts npm: `start`, `dev` (nodemon), et un `.env` géré via `dotenv`.
- Implémenter un frontend (React/Next.js) pour l’UI e-commerce.
- Ajout de tests automatisés (Jest/Supertest) et linter.
- Pagination et recherche avancée sur `/api/products`.
- Gestion des rôles et permissions plus fine, rotation du secret JWT.
- Validation des entrées (Joi/Zod) et gestion d’erreurs centralisée.

## 10. Guide d’export en PDF
Avec `pandoc` installé:
```bash
pandoc docs/rapport-de-stage-ocp-ecommerce.md -o docs/rapport-de-stage-ocp-ecommerce.pdf
```

---
Auteur: Stagiaire – Année 2025
