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

  // Produits liés à l'activité OCP Safi (chimie/phosphates/engrais)
  db.run('DELETE FROM Products');
  const stmt = db.prepare(`
    INSERT INTO Products (
      name, description, price, stock, image_url, category, brand, 
      rating, review_count, discount_percent, is_featured, is_new, 
      is_bestseller, color, weight, dimensions, tags
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  // Acide phosphorique industriel (54%) – Safi
  stmt.run(
    'Acide Phosphorique Industriel 54% - Safi',
    "Solution d'acide phosphorique (P2O5 ~54%) destinée aux usages industriels et à la production d'engrais.",
    5200.00, 120, 'https://images.unsplash.com/photo-1581093458791-9d9b9d9b9d9b?w=400&h=300&fit=crop',
    'Chimie', 'OCP', 4.7, 38, 0, 1, 1, 1, 'Incolore', 1200.0, 'IBC 1000L',
    'ocp,safi,chimie,phosphorique,P2O5,industrie'
  );

  // Acide sulfurique (98%) – amont phosphorique
  stmt.run(
    'Acide Sulfurique 98% - Safi',
    "Acide sulfurique concentré utilisé dans la filière d'attaque du minerai phosphaté (procédé humide).",
    3500.00, 80, 'https://images.unsplash.com/photo-1509395176047-4a66953fd231?w=400&h=300&fit=crop',
    'Chimie', 'OCP', 4.6, 21, 0, 0, 1, 0, 'Incolore', 1600.0, 'Citerne 1000L',
    'ocp,safi,chimie,sulfurique,process'
  );

  // TSP – Triple Super Phosphate (46% P2O5)
  stmt.run(
    'Engrais TSP 46% P2O5 - Granulés',
    'Engrais phosphaté à forte teneur en P2O5 pour corrections de sols et cultures exigeantes.',
    420.00, 300, 'https://images.unsplash.com/photo-1581092334669-1afae7b3d7b0?w=400&h=300&fit=crop',
    'Engrais', 'OCP', 4.5, 112, 5, 1, 0, 1, 'Gris', 50.0, 'Sac 50kg (palette)',
    'ocp,safi,engrais,tsp,P2O5,agriculture'
  );

  // DAP – Diammonium Phosphate (18-46-0)
  stmt.run(
    'Engrais DAP 18-46-0',
    'Engrais binaire azote/phosphore adapté aux semis et aux cultures céréalières.',
    460.00, 280, 'https://images.unsplash.com/photo-1536431311719-398b6704d4cc?w=400&h=300&fit=crop',
    'Engrais', 'OCP', 4.6, 98, 0, 1, 1, 0, 'Beige', 50.0, 'Sac 50kg (palette)',
    'ocp,safi,engrais,dap,18-46-0'
  );

  // MAP – Monoammonium Phosphate (11-52-0)
  stmt.run(
    'Engrais MAP 11-52-0',
    "Engrais concentré en phosphore pour démarrage racinaire et apports localisés.",
    480.00, 240, 'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=400&h=300&fit=crop',
    'Engrais', 'OCP', 4.6, 76, 0, 0, 1, 0, 'Beige', 50.0, 'Sac 50kg (palette)',
    'ocp,safi,engrais,map,11-52-0'
  );

  // NPK formulé – 15-15-15
  stmt.run(
    'Engrais NPK 15-15-15 - Granulés',
    'Formulation équilibrée N-P-K pour cultures diversifiées et entretien des sols.',
    410.00, 260, 'https://images.unsplash.com/photo-1592924357228-91a4acaa3b86?w=400&h=300&fit=crop',
    'Engrais', 'OCP', 4.4, 102, 0, 0, 1, 0, 'Gris', 50.0, 'Sac 50kg (palette)',
    'ocp,safi,engrais,npk,15-15-15'
  );

  // NPK – 10-26-26 (phospho-potassique)
  stmt.run(
    'Engrais NPK 10-26-26 - Granulés',
    "Formulation orientée P et K pour rentes élevées et sols carencés en P/K.",
    455.00, 220, 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&h=300&fit=crop',
    'Engrais', 'OCP', 4.5, 75, 0, 1, 0, 0, 'Gris', 50.0, 'Sac 50kg (palette)',
    'ocp,safi,engrais,npk,10-26-26'
  );

  // Roche phosphatée (BPL 68-72) – Matière première
  stmt.run(
    'Roche Phosphatée (BPL 68-72)',
    'Concentré de phosphate pour valorisation et procédés acides.',
    150.00, 500, 'https://images.unsplash.com/photo-1501630834273-4b5604d2ee31?w=400&h=300&fit=crop',
    'Matières premières', 'OCP', 4.3, 58, 0, 0, 0, 0, 'Brun', 1000.0, 'Big bag 1T',
    'ocp,safi,roche,phosphate,bpl'
  );

  // Granulés phosphatés industriels
  stmt.run(
    'Granulés Phosphatés – Industrie',
    'Granulés pour applications industrielles et formulations spécifiques.',
    320.00, 180, 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop',
    'Industrie', 'OCP', 4.2, 33, 0, 0, 0, 0, 'Gris', 1000.0, 'Big bag 1T',
    'ocp,safi,granules,industrie,phosphate'
  );
  
  stmt.finalize();
  console.log('Admin et produits avancés insérés.');
});

db.close();