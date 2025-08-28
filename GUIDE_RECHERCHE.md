# 🔍 Guide de recherche de produits

## 🎯 **Fonctionnalités de recherche disponibles**

### 1. **Recherche depuis le header**
- **Barre de recherche** en haut de la page
- **Recherche instantanée** par nom, description ou catégorie
- **Bouton de recherche** avec icône 🔍

### 2. **Recherche avancée dans le catalogue**
- **Barre de recherche dédiée** sur la page catalogue
- **Filtres combinés** : recherche + catégorie + prix
- **Recherche en temps réel** pendant la saisie

## 🔧 **Comment utiliser la recherche**

### **Méthode 1 : Recherche rapide (Header)**
1. **Tapez votre recherche** dans la barre en haut
2. **Appuyez sur Entrée** ou cliquez sur 🔍
3. **Vous êtes redirigé** vers le catalogue avec les résultats

### **Méthode 2 : Recherche avancée (Catalogue)**
1. **Allez sur le catalogue** : `http://localhost:3000/catalog`
2. **Utilisez la barre de recherche** en haut de la page
3. **Combinez avec les filtres** pour affiner les résultats

## 📝 **Exemples de recherche**

### **Recherche par nom de produit :**
- `casque` → Trouve "Casque Audio Bluetooth"
- `smartphone` → Trouve "Smartphone Samsung Galaxy"
- `ordinateur` → Trouve "Ordinateur Portable Dell"

### **Recherche par catégorie :**
- `électronique` → Tous les produits électroniques
- `cuisine` → Tous les produits de cuisine
- `sport` → Tous les produits de sport

### **Recherche par description :**
- `bluetooth` → Produits avec Bluetooth
- `sans fil` → Produits sans fil
- `professionnel` → Produits professionnels

## ⚙️ **Filtres combinés**

### **Recherche + Catégorie :**
- Recherche : `casque` + Catégorie : `Électronique`
- Résultat : Casques audio dans la catégorie électronique

### **Recherche + Prix :**
- Recherche : `ordinateur` + Prix min : `500` + Prix max : `1000`
- Résultat : Ordinateurs entre 500€ et 1000€

### **Tous les filtres :**
- Recherche : `lampe` + Catégorie : `Maison` + Prix max : `50`
- Résultat : Lampes de maison sous 50€

## 🎨 **Interface utilisateur**

### **Barre de recherche du header :**
```
[Rechercher un produit...] [🔍]
```

### **Page catalogue :**
```
🔍 Recherche
[Rechercher par nom, description ou catégorie...] 🔍

⚙️ Filtres
[Catégorie ▼] [Prix min] [Prix max] [🗑️ Effacer tout]
```

## 📊 **Affichage des résultats**

### **Compteur de résultats :**
- `5 produits trouvés pour "casque"`
- `3 produits trouvés dans la catégorie "Électronique"`
- `2 produits trouvés pour "lampe" à partir de 20€`

### **Message si aucun résultat :**
- `Aucun produit ne correspond à "xyz"`
- Bouton "Voir tous les produits" pour réinitialiser

## 🔄 **URL et navigation**

### **URLs générées :**
- `http://localhost:3000/catalog?search=casque`
- `http://localhost:3000/catalog?category=Électronique&search=bluetooth`
- `http://localhost:3000/catalog?search=lampe&minPrice=20&maxPrice=100`

### **Partage de recherche :**
- Les URLs peuvent être partagées
- L'état de recherche est conservé lors de la navigation
- Bouton retour fonctionne correctement

## ⚡ **Fonctionnalités avancées**

### **Recherche en temps réel :**
- Les résultats se mettent à jour automatiquement
- Pas besoin d'appuyer sur Entrée
- Performance optimisée

### **Recherche insensible à la casse :**
- `CASQUE` = `casque` = `Casque`
- Recherche en français
- Gestion des accents

### **Recherche partielle :**
- `cas` trouve `casque`
- `smart` trouve `smartphone`
- `port` trouve `ordinateur portable`

## 🎯 **Conseils d'utilisation**

### **Pour une recherche efficace :**
1. **Utilisez des mots-clés courts** : `casque` au lieu de `casque audio bluetooth`
2. **Combinez avec les filtres** pour affiner les résultats
3. **Essayez différentes variations** si aucun résultat
4. **Utilisez la catégorie** pour limiter la recherche

### **Exemples de recherches populaires :**
- `casque` → Tous les casques audio
- `smartphone` → Tous les smartphones
- `lampe` → Toutes les lampes
- `bureau` → Mobilier de bureau
- `sport` → Équipements sportifs

## 🚀 **Fonctionnalités à venir**

- **Recherche par tags** (promotions, nouveautés, etc.)
- **Historique de recherche**
- **Suggestions automatiques**
- **Recherche par image**
- **Filtres avancés** (marque, couleur, etc.)

## 📱 **Responsive design**

- **Mobile** : Barre de recherche adaptée
- **Tablette** : Interface optimisée
- **Desktop** : Recherche complète avec tous les filtres

## 🎉 **Résultat attendu**

Avec la fonctionnalité de recherche, vos utilisateurs peuvent :
- ✅ **Trouver rapidement** les produits qu'ils cherchent
- ✅ **Affiner leurs recherches** avec les filtres
- ✅ **Naviguer facilement** entre les résultats
- ✅ **Partager leurs recherches** via URL
- ✅ **Avoir une expérience fluide** et intuitive
