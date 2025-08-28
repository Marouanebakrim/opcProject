require('../models/user');
require('../models/product');
require('../models/order');
require('../models/orderItem');
require('../models/review');
require('../models/wishlist');
const db = require('../config/db');
const bcrypt = require('bcryptjs');

db.serialize(() => {
  // Admin user
  db.run('DELETE FROM Users');
  const adminHash = bcrypt.hashSync('admin123', 10);
  db.run('INSERT INTO Users (name, email, password, is_admin) VALUES (?, ?, ?, ?)', ['Admin', 'admin@ocp.com', adminHash, 1]);

  // Produits avec données avancées
  db.run('DELETE FROM Products');
  const stmt = db.prepare(`
    INSERT INTO Products (
      name, description, price, stock, image_url, category, brand, 
      rating, review_count, discount_percent, is_featured, is_new, 
      is_bestseller, color, weight, dimensions, tags
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  
  // Électronique
  stmt.run(
    'Casque Audio Bluetooth Sony WH-1000XM4',
    'Casque sans fil haute qualité avec réduction de bruit active, 30h d\'autonomie',
    299.99, 25, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
    'Électronique', 'Sony', 4.8, 156, 15, 1, 0, 1, 'Noir', 0.254, '167x194x72mm',
    'bluetooth,noise-cancelling,premium'
  );
  
  stmt.run(
    'Smartphone Samsung Galaxy S23 Ultra',
    'Smartphone dernière génération avec appareil photo 200MP, S Pen intégré',
    1199.99, 15, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop',
    'Électronique', 'Samsung', 4.9, 89, 0, 1, 1, 1, 'Vert', 0.233, '163.4x78.1x8.9mm',
    'smartphone,5g,camera,premium'
  );
  
  stmt.run(
    'Ordinateur Portable Dell XPS 13',
    'Ordinateur portable 13" avec processeur Intel i7, écran 4K, 16GB RAM',
    1499.99, 8, 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop',
    'Électronique', 'Dell', 4.7, 203, 10, 1, 0, 1, 'Argent', 1.2, '302x199x14.8mm',
    'laptop,ultrabook,premium,4k'
  );
  
  // Accessoires
  stmt.run(
    'Sac à Dos Professionnel SwissGear',
    'Sac à dos pour ordinateur portable avec compartiments multiples, protection anti-vol',
    89.99, 30, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop',
    'Accessoires', 'SwissGear', 4.6, 78, 20, 0, 0, 0, 'Gris', 1.1, '45x30x20cm',
    'backpack,laptop,travel,anti-theft'
  );
  
  stmt.run(
    'Chargeur Sans Fil Apple MagSafe',
    'Chargeur sans fil 15W compatible MagSafe pour iPhone, design élégant',
    39.99, 45, 'https://images.unsplash.com/photo-1609592806596-b43bada2f2d2?w=400&h=300&fit=crop',
    'Accessoires', 'Apple', 4.5, 234, 0, 0, 1, 0, 'Blanc', 0.115, '6x6x1.2cm',
    'wireless-charging,magsafe,iphone'
  );
  
  stmt.run(
    'Étui de Protection OtterBox Defender',
    'Étui en silicone pour smartphone avec protection renforcée, testé militaire',
    49.99, 60, 'https://images.unsplash.com/photo-1603314585442-ee3b3c16fbcf?w=400&h=300&fit=crop',
    'Accessoires', 'OtterBox', 4.4, 189, 25, 0, 0, 0, 'Noir', 0.085, '15x8x1.5cm',
    'case,protection,military-grade'
  );
  
  // Maison
  stmt.run(
    'Lampe de Bureau LED Philips Hue',
    'Lampe de bureau moderne avec éclairage réglable, contrôle WiFi, 16 millions de couleurs',
    129.99, 20, 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=300&fit=crop',
    'Maison', 'Philips', 4.7, 67, 0, 1, 1, 0, 'Blanc', 0.8, '45x15x15cm',
    'smart-lighting,wifi,color-changing'
  );
  
  stmt.run(
    'Coussin Décoratif IKEA FJÄDRAR',
    'Coussin décoratif en velours avec design moderne, hypoallergénique',
    19.99, 100, 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400&h=300&fit=crop',
    'Maison', 'IKEA', 4.3, 456, 30, 0, 0, 1, 'Bleu', 0.4, '50x50cm',
    'cushion,decorative,velvet'
  );
  
  stmt.run(
    'Vase en Céramique Artisanale',
    'Vase en céramique artisanale pour décoration, fait main, design unique',
    79.99, 12, 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
    'Maison', 'Artisan', 4.8, 23, 0, 0, 1, 0, 'Terre cuite', 1.2, '25x15cm',
    'handmade,ceramic,unique'
  );
  
  // Cuisine
  stmt.run(
    'Machine à Café Expresso DeLonghi',
    'Machine à café automatique avec broyeur intégré, 19 bars, écran LCD',
    599.99, 8, 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop',
    'Cuisine', 'DeLonghi', 4.9, 34, 15, 1, 0, 1, 'Inox', 8.5, '35x25x45cm',
    'espresso,automatic,grinder'
  );
  
  stmt.run(
    'Mixeur Professionnel KitchenAid',
    'Mixeur haute puissance pour cuisine professionnelle, 1000W, 5 vitesses',
    199.99, 15, 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
    'Cuisine', 'KitchenAid', 4.6, 89, 0, 0, 0, 0, 'Rouge', 3.2, '20x15x35cm',
    'blender,professional,1000w'
  );
  
  stmt.run(
    'Poêle Anti-adhésive Tefal',
    'Poêle en acier inoxydable avec revêtement anti-adhésif, induction compatible',
    89.99, 25, 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
    'Cuisine', 'Tefal', 4.5, 167, 20, 0, 0, 0, 'Noir', 1.8, '28cm',
    'pan,non-stick,induction'
  );
  
  // Bureau
  stmt.run(
    'Chaise de Bureau Ergonomique Herman Miller',
    'Chaise de bureau avec support lombaire ajustable, design ergonomique',
    899.99, 5, 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
    'Bureau', 'Herman Miller', 4.9, 12, 0, 1, 0, 1, 'Gris', 18.5, '65x65x120cm',
    'ergonomic,premium,adjustable'
  );
  
  stmt.run(
    'Bureau Modulaire IKEA BEKANT',
    'Bureau moderne avec rangements intégrés, hauteur réglable électrique',
    299.99, 10, 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop',
    'Bureau', 'IKEA', 4.4, 234, 25, 0, 0, 0, 'Chêne', 45.0, '160x80x75cm',
    'desk,modular,adjustable-height'
  );
  
  stmt.run(
    'Organisateur de Bureau en Bois',
    'Organisateur en bois avec compartiments multiples, design scandinave',
    49.99, 35, 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop',
    'Bureau', 'Scandinavian', 4.2, 89, 0, 0, 0, 0, 'Bois naturel', 1.5, '30x20x15cm',
    'organizer,wood,scandinavian'
  );
  
  // Sport
  stmt.run(
    'Vélo d\'Appartement Technogym',
    'Vélo d\'appartement pliable avec écran LCD, 20 niveaux de résistance',
    799.99, 3, 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    'Sport', 'Technogym', 4.7, 45, 10, 1, 0, 0, 'Noir', 45.0, '120x60x140cm',
    'exercise-bike,foldable,lcd'
  );
  
  stmt.run(
    'Tapis de Yoga Lululemon',
    'Tapis de yoga antidérapant avec sac de transport, 5mm d\'épaisseur',
    89.99, 50, 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    'Sport', 'Lululemon', 4.6, 178, 0, 0, 0, 1, 'Violet', 2.5, '183x61cm',
    'yoga,non-slip,premium'
  );
  
  stmt.run(
    'Haltères Ajustables Bowflex',
    'Haltères en fonte avec système de verrouillage, 5-52.5kg ajustables',
    299.99, 8, 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    'Sport', 'Bowflex', 4.8, 67, 15, 0, 0, 0, 'Rouge', 25.0, '45x15x15cm',
    'dumbbells,adjustable,weight-training'
  );
  
  stmt.finalize();
  console.log('Admin et produits avancés insérés.');
});

db.close();