// 🎴 Règles du jeu Danish (aussi appelé Shithead)

// 👥 Joueurs : 2 à 5  
// 🃏 Objectif : Se débarrasser de toutes ses cartes. Le dernier joueur à y parvenir est le "Shithead".

// 📦 Distribution :
// - Chaque joueur reçoit :
//   • 3 cartes face cachée (non regardées)
//   • 3 cartes face visible (choisies parmi sa main initiale)
//   • 3 cartes en main

// 🔁 Déroulement du jeu :
// 1. Le joueur avec la plus petite carte commence.
// 2. À chaque tour, un joueur doit poser une carte **égale ou supérieure** à la précédente sur la pile.
// 3. On peut jouer **plusieurs cartes identiques** en même temps.
// 4. Si on ne peut pas jouer, on ramasse toute la pile.
// 5. Après avoir joué, si on a **moins de 3 cartes en main** et que la pioche est encore là, on pioche jusqu’à 3.
// 6. Une fois la main vide, on joue les cartes visibles.
// 7. Une fois les visibles jouées, on joue les cartes cachées **au hasard**.

// 🔥 Effets spéciaux :
// - **2** : Peut être posée sur n’importe quelle carte.
// - **3** : Miroir → copie la carte précédente.
// - **7** : Seules les cartes **inférieures ou égales à 7** peuvent suivre.
// - **8** : Le joueur suivant **passe son tour**.
// - **10** : Coupe la pile (toutes les cartes sont retirées du jeu). Le joueur **rejoue**.
// - **As** : Attaque (effet libre ou à définir, ex : choisir le prochain joueur).
// - **4 cartes identiques consécutives** : Peuvent aussi couper la pile.

// 🏁 Fin de partie :
// - Le premier à n’avoir **plus aucune carte** gagne.
// - Les autres continuent à jouer.
// - Le **dernier joueur** encore en jeu est le **Shithead**.


// 🎴 Projet : Danish (Shithead) – Jeu de cartes multijoueur (2-5 joueurs)

// 🎯 Objectif :
// Développer une version numérique du jeu de cartes "Danish" avec ses règles spécifiques, en JS orienté objet. Interface simple (console ou HTML).

// 👥 Répartition (3 personnes) :

// 1. Cartes & Pioche (Card.js / Deck.js) – Personne A
// - Créer la classe Card (name, value, symbol, effet)
// - Générer le deck 52 cartes (4 symboles, 13 valeurs)
// - Ajouter les effets spéciaux sous forme de fonctions dans un objet `effetsFonctions`
// - Mélanger le deck (`shuffle()`)
// - Gérer la pioche, la pile centrale et les cartes "coupées" (hors jeu)

// 2. Joueurs (Player.js) – Personne B
// - Créer la classe Player (name, main[], faceUp[], faceDown[])
// - Méthodes : piocher, jouer une ou plusieurs cartes, compléter la main jusqu’à 3 (si pioche dispo)
// - Vérification : si main vide => passer aux cartes faceUp puis faceDown
// - Gérer les interactions avec les cartes spéciales (via effet appelé)

// 3. Moteur de jeu (Game.js) – Personne C
// - Créer une classe Game
// - Initialiser le jeu (joueurs, distribution, pioche)
// - Gérer le tour par tour
// - Gérer les règles :
//   - Jouer des cartes de même valeur ensemble
//   - Cartes spéciales :
//     • 2 → Peut être posée sur tout
//     • 3 → Miroir (copie la valeur précédente)
//     • 7 → Seules les cartes < 7 peuvent suivre
//     • 8 → Passe le tour suivant
//     • 10 → Coupe la pile (rejoue après)
//     • As → Attaque (effet à définir)
//     • 4 cartes identiques consécutives → Coupe
//   - Rejouer après avoir coupé
//   - Compléter la main à 3 cartes si pioche non vide

// 🏁 Fin du jeu :
// Le joueur qui joue toutes ses cartes (main + faceUp + faceDown) gagne. Les autres continuent. Le dernier joueur est le "Shithead".

// 📦 Structure :
// - Card.js
// - Player.js
// - Game.js
// - index.js (ou app.js pour lancement)
