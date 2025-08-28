---
title: "TITRE DU RAPPORT (à remplacer)"
author: "Nom Prénom (à remplacer)"
date: "Année (à remplacer)"
institute: "Établissement / Département (à remplacer)"
company: "Entreprise / Service (à remplacer)"
supervisor: "Encadrant(e) (à remplacer)"
period: "Période du stage (JJ/MM – JJ/MM) (à remplacer)"
location: "Ville, Pays (à remplacer)"
toc: true
toc-depth: 3
---

# Page de garde
Renseigner les métadonnées ci-dessus. Vous pouvez ajouter un logo via Markdown: `![logo](./chemin/vers/logo.png)`.

## Remerciements
Texte libre…

## Présentation de l’entreprise / contexte d’accueil
Texte libre…

## Objectifs du stage
- Objectif 1…
- Objectif 2…
- Objectif 3…

## Missions réalisées
- Mission A…
- Mission B…
- Mission C…

## Méthodologie et organisation
Outils, méthodes, suivi…

## Compétences développées
- Compétence 1…
- Compétence 2…
- Compétence 3…

## Difficultés rencontrées et solutions
Problème → Solution…

## Conclusion et perspectives
Texte libre…

---

## Annexe A – Mise en place du projet (exemple e-commerce OCP)
```bash
cd backend
npm ci
node server.js
```

## Annexe B – Endpoints (exemples)
```bash
curl http://localhost:5000/
curl http://localhost:5000/api/products
```

## Annexe C – Export en PDF/DOCX
```bash
# PDF
pandoc docs/modele-rapport-de-stage.md -o docs/rapport.pdf
# DOCX
pandoc docs/modele-rapport-de-stage.md -o docs/rapport.docx
```
