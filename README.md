# 🃏 Danish (Shithead) – Jeu de Cartes en JavaScript

## 🎯 Objectif
Créer une version numérique du jeu de cartes **Danish (aussi appelé Shithead)**, jouable de 2 à 5 joueurs.  
Chaque joueur doit se débarrasser de toutes ses cartes. Le dernier devient le **Shithead**.

---

## 🚀 Lancement
1. Cloner le dépôt
2. Ouvrir `index.html` dans un navigateur  
   _(ou lancer via `Live Server` si utilisé en local)_

---

## 🗂️ Structure du projet

- `Card.js` : gestion des cartes et effets spéciaux
- `Deck.js` : création et mélange du paquet
- `Player.js` : gestion des joueurs et de leur main
- `Game.js` : moteur du jeu, logique des tours
- `index.js` : point d’entrée, gestion UI/console
- `style.css` : style minimal si interface HTML

---

## 🃏 Règles du jeu

### 📦 Mise en place
- 3 cartes **face cachée**
- 3 cartes **face visible**
- 3 cartes **en main**

### 🔁 Tour de jeu
- Jouer une carte **égale ou supérieure** à la dernière de la pile
- Jouer **plusieurs cartes identiques** en une fois
- Sinon, **ramasser la pile**
- Toujours **piocher jusqu’à 3 cartes** si la pioche est disponible
- Une fois la main vide → jouer les visibles, puis les cachées à l’aveugle

### 🃏 Cartes spéciales
| Carte | Effet                             |
|-------|-----------------------------------|
| 2     | Peut être posée sur n'importe quoi |
| 3     | Miroir : copie la carte précédente |
| 7     | Seules les cartes **≤ 7** peuvent suivre |
| 8     | Le joueur suivant **passe**        |
| 10    | **Coupe** la pile et rejoue       |
| As    | **Attaque** (effet libre à définir)|
| 4 mêmes cartes | **Coupe** la pile         |

### 🏁 Fin de partie
- Premier à ne plus avoir aucune carte : **gagné**
- Dernier encore en jeu : **Shithead**

---

## 👥 Équipe

- 🎮 Game logic : Personne C  
- 🃏 Cartes & pioche : Personne A  
- 👤 Joueurs & mains : Personne B

---

## 📌 À faire / Améliorations possibles
- Interface graphique plus poussée
- Mode multijoueur en ligne
- Animations et effets visuels
- IA simple pour joueur(s) manquants
