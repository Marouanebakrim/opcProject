# Script PowerShell pour démarrer OCP e-commerce
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "    OCP e-commerce - Démarrage" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 1. Vérification de Node.js
Write-Host "1. Vérification de Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js détecté: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "ERREUR: Node.js n'est pas installé ou n'est pas dans le PATH" -ForegroundColor Red
    Write-Host "Veuillez installer Node.js depuis https://nodejs.org/" -ForegroundColor Red
    Read-Host "Appuyez sur Entrée pour continuer"
    exit 1
}

# 2. Initialisation de la base de données
Write-Host ""
Write-Host "2. Initialisation de la base de données..." -ForegroundColor Yellow
Set-Location "backend"
try {
    node seed/seed.js
    Write-Host "✓ Base de données initialisée" -ForegroundColor Green
} catch {
    Write-Host "ERREUR: Impossible d'initialiser la base de données" -ForegroundColor Red
    Read-Host "Appuyez sur Entrée pour continuer"
    exit 1
}

# 3. Démarrage du serveur backend
Write-Host ""
Write-Host "3. Démarrage du serveur backend..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; npm start" -WindowStyle Normal

# 4. Attente pour le démarrage du backend
Write-Host ""
Write-Host "4. Attente de 5 secondes pour le démarrage du backend..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

# 5. Démarrage du frontend
Write-Host ""
Write-Host "5. Démarrage du frontend..." -ForegroundColor Yellow
Set-Location "../frontend"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; npm start" -WindowStyle Normal

# 6. Affichage des informations
Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "    Application démarrée avec succès !" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "📍 URLs d'accès :" -ForegroundColor White
Write-Host "   Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host "   Backend:  http://localhost:5000" -ForegroundColor Cyan
Write-Host ""
Write-Host "🔑 Identifiants de test :" -ForegroundColor White
Write-Host "   Admin:    admin@ocp.com / admin123" -ForegroundColor Yellow
Write-Host "   Utilisateur: Créez un compte via l'inscription" -ForegroundColor Yellow
Write-Host ""
Write-Host "🎯 Fonctionnalités disponibles :" -ForegroundColor White
Write-Host "   ✓ Interface moderne avec Tailwind CSS" -ForegroundColor Green
Write-Host "   ✓ Navigation par catégories" -ForegroundColor Green
Write-Host "   ✓ Filtres de recherche" -ForegroundColor Green
Write-Host "   ✓ Panier d'achat" -ForegroundColor Green
Write-Host "   ✓ Gestion admin des produits" -ForegroundColor Green
Write-Host "   ✓ Authentification sécurisée" -ForegroundColor Green
Write-Host ""
Write-Host "💡 Pour arrêter l'application :" -ForegroundColor White
Write-Host "   Fermez les fenêtres de terminal ou utilisez Ctrl+C" -ForegroundColor Gray
Write-Host ""
Read-Host "Appuyez sur Entrée pour fermer cette fenêtre"









