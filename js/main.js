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


class Game{
    constructor(players, distribution){
        this.players = players;
        this.distribution = distribution;
        this.deck = [];
        this.pile = [];
    }
    generateDeck(){
        const signes = ['♠', '♥', '♦', '♣'];
        const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

        // for (let signe of signes) {
        //     for (let value of values) {
        //         const nom = ${value} de ${signe};
        //         const effet = effetsFonctions[value] || null; // effet uniquement pour les cartes spéciales
        //         const carte = new Card(nom, value, signe, effet);
        //         deck.push(carte);
        //     }
        // }
    }
    distributionCards(){
        for (let player of this.players) {
            player.hand = this.deck.splice(0, 3);
            player.faceUp = this.deck.splice(0, 3);
            player.faceDown = this.deck.splice(0, 3);
        } 
    }
    
    turnEnd(){
        return `Fin du tour`;
    }
}

class Card {
    constructor(name, value, symbol, effect) {
        this.name = name;
        this.value = value;
        this.symbol = symbol;
        this.effect = effect;
    }
}

const effetsFonctions = {
    "2": (game) => {/* peut poser sur tout */},
    "3": (game) => {/* copie la carte précédente */},
    "7": (game) => {/* limite à < 7 */},
    "8": (game) => { game.skipNextPlayer(); },
    "10": (game) => { game.burnPile(); game.replay(); },
    "As": (game) => { game.attack(); }
  };

const getEffet = (name) => effetsFonctions[name] || null;
for (let sym of symbols) {
  for (let val of values) {
    pioche.push(new Card(val.name, val.value, sym, getEffet(val.name)));
  }
}

// playMultipleCards(cards){
    //     return cards.every(c => c.value === cards[0].value);
    // }