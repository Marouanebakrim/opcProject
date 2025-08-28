@echo off
echo ========================================
echo    OCP e-commerce - Démarrage
echo ========================================
echo.

echo 1. Vérification de Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo ERREUR: Node.js n'est pas installé ou n'est pas dans le PATH
    echo Veuillez installer Node.js depuis https://nodejs.org/
    pause
    exit /b 1
)
echo ✓ Node.js détecté

echo.
echo 2. Initialisation de la base de données...
cd backend
node seed/seed.js
if errorlevel 1 (
    echo ERREUR: Impossible d'initialiser la base de données
    pause
    exit /b 1
)
echo ✓ Base de données initialisée

echo.
echo 3. Démarrage du serveur backend...
start "Backend - OCP e-commerce" cmd /k "cd /d %CD% && npm start"

echo.
echo 4. Attente de 5 secondes pour le démarrage du backend...
timeout /t 5 /nobreak >nul

echo.
echo 5. Démarrage du frontend...
cd ../frontend
start "Frontend - OCP e-commerce" cmd /k "cd /d %CD% && npm start"

echo.
echo ========================================
echo    Application démarrée avec succès !
echo ========================================
echo.
echo 📍 URLs d'accès :
echo    Frontend: http://localhost:3000
echo    Backend:  http://localhost:5000
echo.
echo 🔑 Identifiants de test :
echo    Admin:    admin@ocp.com / admin123
echo    Utilisateur: Créez un compte via l'inscription
echo.
echo 🎯 Fonctionnalités disponibles :
echo    ✓ Interface moderne inspirée des meilleurs e-commerce
echo    ✓ Navigation par catégories
echo    ✓ Filtres de recherche
echo    ✓ Panier d'achat
echo    ✓ Gestion admin des produits
echo    ✓ Authentification sécurisée
echo.
echo 💡 Pour arrêter l'application :
echo    Fermez les fenêtres de terminal ou utilisez Ctrl+C
echo.
pause
