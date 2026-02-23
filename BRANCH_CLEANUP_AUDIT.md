# Branch & codebase cleanup audit (agent-v0)

Date: 2026-02-23
Branch analysée: `work`

## Constat rapide

- Une seule branche locale existe actuellement (`work`), sans remote configuré.
- L’historique est très orienté "hotfix/index.html" (plusieurs commits génériques "Update index.html").
- Le front est concentré dans un unique fichier `index.html` (HTML + CSS + JS), ce qui accélère les changements rapides mais rend la maintenance plus fragile.

## Signaux de "bazar" observés

1. **Historique peu lisible**
   - Commits avec messages vagues (`Update index.html`) mélangés à des commits "feature".
   - Difficile d’identifier rapidement quel commit corrige quoi.

2. **Monolithe front-end**
   - Le comportement UI, le style et la logique réseau sont tous dans le même fichier.
   - Les évolutions successives augmentent le risque de régression (effet domino).

3. **Couplage fort au backend dans le client**
   - Construction dynamique d’URLs d’API et logique d’intégration directement côté page.
   - Peu d’isolation des responsabilités (config, rendu, transport, parsing).

## Recommandations prioritaires

1. **Nettoyer la stratégie de branches**
   - Conserver `main` (prod), `develop` (intégration), `feature/*` (courtes durées), `hotfix/*` (urgence).
   - Éviter le travail long en direct sur une seule branche persistante.

2. **Améliorer la qualité des commits**
   - Utiliser Conventional Commits (`feat:`, `fix:`, `refactor:`...).
   - Faire des commits petits, thématiques et descriptifs.

3. **Refactor progressif du front**
   - Étape 1: extraire le JS dans `src/app.js`.
   - Étape 2: extraire le CSS dans `src/styles.css`.
   - Étape 3: séparer modules `api.js`, `state.js`, `render.js`.

4. **Sécuriser les changements**
   - Ajouter un minimum de checks automatisés (lint + smoke test).
   - Ajouter une checklist PR (API ping, envoi message, rendu insights, fallback trends).

## Verdict

Ton impression est fondée: ce n’est pas "cassé", mais ça commence à devenir difficile à maintenir proprement. Le plus gros risque n’est pas la fonctionnalité immédiate, c’est la **dette de structure** (branche + monofichier front).
