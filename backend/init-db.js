const db = require('./config/db');

console.log('Initialisation de la base de données...');

db.serialize(() => {
  // Supprimer les tables existantes
  db.run('DROP TABLE IF EXISTS OrderItems');
  db.run('DROP TABLE IF EXISTS Orders');
  db.run('DROP TABLE IF EXISTS Wishlist');
  db.run('DROP TABLE IF EXISTS Reviews');
  db.run('DROP TABLE IF EXISTS Products');
  db.run('DROP TABLE IF EXISTS Users');

  // Créer la table Users
  db.run(`
    CREATE TABLE Users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      is_admin BOOLEAN DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Créer la table Products avec tous les nouveaux champs
  db.run(`
    CREATE TABLE Products (
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

  // Créer la table Orders
  db.run(`
    CREATE TABLE Orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      total_amount REAL NOT NULL,
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES Users (id)
    )
  `);

  // Créer la table OrderItems
  db.run(`
    CREATE TABLE OrderItems (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER NOT NULL,
      product_id INTEGER NOT NULL,
      quantity INTEGER NOT NULL,
      price REAL NOT NULL,
      FOREIGN KEY (order_id) REFERENCES Orders (id),
      FOREIGN KEY (product_id) REFERENCES Products (id)
    )
  `);

  // Créer la table Reviews
  db.run(`
    CREATE TABLE Reviews (
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

  // Créer la table Wishlist
  db.run(`
    CREATE TABLE Wishlist (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      product_id INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES Users (id) ON DELETE CASCADE,
      FOREIGN KEY (product_id) REFERENCES Products (id) ON DELETE CASCADE,
      UNIQUE(user_id, product_id)
    )
  `);

  console.log('✅ Base de données initialisée avec succès !');
});

db.close();
