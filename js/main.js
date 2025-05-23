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


const effectsFonctions = {
    "2": (game) => {/* peut poser sur tout */},
    "3": (game) => {/* copie la carte précédente */},
    "7": (game) => {/* limite à < 7 */},
    "8": (game) => { game.skipNextPlayer(); },
    "10": (game) => { game.burnPile(); game.replay(); },
    "As": (game) => { game.attack(); }
  };

const getEffect = (name) => effectsFonctions[name] || null;


// === Classe GAME ===
class Game{
    constructor(players, distribution){
        this.players = players;
        this.distribution = distribution;
        this.deck = [];
        this.pile = [];
        this.generateDeck();
        this.shuffleDeck();
        this.initPile();
        this.currentPlayerIndex = 0;
    }
    
    generateDeck(){
        const symbols = ['♠', '♥', '♦', '♣'];
        const values = [
          { name: 'deux', display: '2', value: 2 },
          { name: 'trois', display: '3', value: 3 },
          { name: 'quatre', display: '4', value: 4 },
          { name: 'cinq', display: '5', value: 5 },
          { name: 'six', display: '6', value: 6 },
          { name: 'sept', display: '7', value: 7 },
          { name: 'huit', display: '8', value: 8 },
          { name: 'neuf', display: '9', value: 9 },
          { name: 'dix', display: '10', value: 10 },
          { name: 'valet', display: 'J', value: 11 },
          { name: 'dame', display: 'Q', value: 12 },
          { name: 'roi', display: 'K', value: 13 },
          { name: 'as', display: 'A', value: 14 }
        ];

        for (let sym of symbols) {
            for (let val of values) {
              this.deck.push(new Card(val.display, val.value, sym, getEffect(val.display)));
            }
          }
    }

    shuffleDeck() {
        for (let i = this.deck.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }
      }

    distributionCards(){
        for (let player of this.players) {
            player.hand = this.deck.splice(0, 3);
            player.faceUp = this.deck.splice(0, 3);
            player.faceDown = this.deck.splice(0, 3);
        } 
    }

    initPile(){
        let lastCardDeck = this.deck[this.deck.length -1];
        this.pile.push(lastCardDeck);
        this.deck.pop();
    }

    nextTurn() {
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
    }

    isWinner(first){
         if (this.players.some(player => 
            player.hand.length === 0 &&
            player.faceUp.length === 0 &&
            player.faceDown.length === 0
          )){

            let winner = this.players.indexOf(first);
            this.players.splice(winner, 1);
            return `${first.name} - Congratulation you're not the Shithead ! Players left : ${players.length}`
          }
    }
    isOver(){
        return this.players.length == 1;
    }

    burnPile(){
        this.pile = [];
    }

    playTurn() {
        if (this.isOver()) return;
      
        const currentPlayer = this.players[this.currentPlayerIndex];
      
        const play = () => {
          if (
            currentPlayer.selectedCards.length > 0 &&
            currentPlayer.canPlay(currentPlayer.selectedCards[0], this.pile)
          ) {
            currentPlayer.play(this.pile);
            currentPlayer.clearSelection();
            currentPlayer.draw(this.deck);
          } else {
            currentPlayer.pickUpPile(this.pile);
          }
      
          this.nextTurn();
        };
      
        if (this.currentPlayerIndex === 0) {
          // Joueur humain, attend le clic sur "Play hand"
          return;
        }
      
        // IA
        setTimeout(() => {
          const playable = currentPlayer.hand.find(c => currentPlayer.canPlay(c, this.pile));
          if (playable) currentPlayer.selectedCards = [playable];
      
          play();
          UpdateHand();
          UpdatePile();
          UpdateDeck();
      
          triggerAITurns(); // 🔁 Rejouer si c’est encore une IA
        }, 2000);
      }
      
      
    
}

// === Classe CARD ===
class Card {
    constructor(name, value, symbol, effect) {
        this.name = name;
        this.value = value;
        this.symbol = symbol;
        this.effect = effect;
    }
}

// === Classe PLAYER ===
class Player {
    constructor(name) {
        this.name = name;
        this.hand = [];
        this.faceUp = [];
        this.faceDown = [];
        this.selectedCards = [];
    }

    draw(deck) {
        while (this.hand.length < 3 && deck.length > 0) {
          const card = deck.pop(); // retirer du dessus de la pioche
          this.hand.push(card);
        }
      }
      

    selectCard(name, symbol) {
        const foundCard = this.hand.find(
          c => c.name === name && c.symbol === symbol
        );
      
        if (!foundCard) return;
      
        // Si aucune carte encore sélectionnée → on ajoute
        if (this.selectedCards.length === 0) {
          this.selectedCards.push(foundCard);
          return;
        }
      
        // Sinon, vérifier que la nouvelle carte a la même valeur
        const selectedValue = this.selectedCards[0].value;
        const selectedSymbol = this.selectedCards[0].symbol;
        if (foundCard.value === selectedValue && foundCard.symbol != selectedSymbol) {
          this.selectedCards.push(foundCard);
        } else {
            this.selectedCards = [];
            this.selectedCards.push(foundCard);
        }
      } 
      

    clearSelection(){
        this.selectedCards = [];
    }

    canPlay(card, pile){
        const topCard = pile[pile.length - 1];
        return (
            !topCard ||          // pile vide = OK
            card.value == 2 || // carte 2 = peut toujours être jouée
            (topCard.value === 7 && card.value <= 7) || // carte 7 = <= 7
            card.value >= topCard.value // condition de base carte >= dernière carte de la pile
        );
    }

    play(pile) {
        if (!this.selectedCards.length == 0) {
            for (let card of this.selectedCards){
                const index = this.hand.indexOf(card);
                if (index !== -1) {
                    this.hand.splice(index, 1);
                }
                pile.push(card)
            }
        }
    }

    playMultiple() {
        return this.hand.every(c => c.value === this.hand[0].value);
    }

    pickUpPile(pile) {
        this.hand.push(...pile);
    }

    // hasDuplicateValues() {
    //     const valueCounts = {};

    //     // Compter le nombre de fois que chaque valeur apparaît dans la main
    //     this.hand.forEach(card => {
    //         const value = card.value;
    //         if (valueCounts[value]) {
    //             valueCounts[value]++;
    //         } else {
    //             valueCounts[value] = 1;
    //         }
    //     });

    //     // Vérifier si au moins une valeur apparaît plus d'une fois
    //     return Object.values(valueCounts).some(count => count >= 2);
    // }

}

// ==================================================
// ===========🃏 🃏 🃏==============
// ==================================================


const playerNameInput = document.getElementById('name');
const playerNbrInput = document.getElementById('nbr-players');
const startBtn = document.querySelector('.btn--add');
const formContainerHTML = document.querySelector('.form');
const gameTableHTML = document.querySelector('.game-table');
const landingUI = document.querySelector('.landing-UI');
let game;
let card;
let cardName;
let cardSymbol;
let pileHTML;
let deckHTML;
// ========== 💥💥 Event click boutton START 💥💥 ==========
startBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let playerNbr = Number(playerNbrInput.value);
    let playerName = playerNameInput.value;
  
    const players = [];
  
    for (let i = 0; i < playerNbr; i++) {
      players.push(new Player(`Player ${i + 1}`));
    }
    game = new Game(players);
    game.distributionCards();
    landingUI.style.display = "none";

    // ========== 🃏 Générer les joueurs + mains 🃏 ==========
   for (let index = 0; index < playerNbr; index++) {
    gameTableHTML.innerHTML += `
    <div class="player__container" id="player-${index + 1}">
                <div class="player__name">${game.players[index].name}</div>
                <div class="player__cards">
                    <div class="player__face-down player__cards--container">
                        <div class="card card--down">
                        <img src="img/cards/card-back.png" alt="card" class="card--back">
                        </div>
                        <div class="card card--down">
                        <img src="img/cards/card-back.png" alt="card" class="card--back">
                        </div>
                        <div class="card card--down">
                        <img src="img/cards/card-back.png" alt="card" class="card--back">
                       </div>
                    </div>
                    <div class="player__face-up player__cards--container">
                        <div class="card card--up">
                        <img src="img/cards/${game.players[index].faceUp[0].name}${game.players[index].faceUp[0].symbol}.png" alt="card" data-name="${game.players[index].faceUp[0].name}" data-symbol="${game.players[index].faceUp[0].symbol}">
                        </div>
                        <div class="card card--up">
                        <img src="img/cards/${game.players[index].faceUp[1].name}${game.players[index].faceUp[1].symbol}.png" alt="card" data-name="${game.players[index].faceUp[1].name}" data-symbol="${game.players[index].faceUp[1].symbol}">
                        </div>
                        <div class="card card--up">
                        <img src="img/cards/${game.players[index].faceUp[2].name}${game.players[index].faceUp[2].symbol}.png" alt="card" data-name="${game.players[index].faceUp[2].name}" data-symbol="${game.players[index].faceUp[2].symbol}">
                        </div>
                    </div>
                    <div class="player__hand player__cards--container">
                        <div class="card card--hand">
                        <img src="img/cards/${game.players[index].hand[0].name}${game.players[index].hand[0].symbol}.png" alt="card" data-name="${game.players[index].hand[0].name}" data-symbol="${game.players[index].hand[0].symbol}">
                        </div>
                        <div class="card card--hand">
                        <img src="img/cards/${game.players[index].hand[1].name}${game.players[index].hand[1].symbol}.png" alt="card" data-name="${game.players[index].hand[1].name}" data-symbol="${game.players[index].hand[1].symbol}">
                        </div>
                        <div class="card card--hand">
                        <img src="img/cards/${game.players[index].hand[2].name}${game.players[index].hand[2].symbol}.png" alt="card" data-name="${game.players[index].hand[2].name}" data-symbol="${game.players[index].hand[2].symbol}">
                        </div>
                    </div>
                </div>
    </div>
    `
    }

    // ========== 🃏 Générer le deck 🃏 ==========
    deckHTML = document.createElement('div');
    deckHTML.classList = 'deck__container';
    for (let index = 0; index < game.deck.length; index++) {
        deckHTML.innerHTML += `
        <div class="card card--deck">
            <img src="img/cards/card-back.png" alt="card" class="card--back">
        </div>
        `
    }
    gameTableHTML.append(deckHTML);

    // ========== 🃏 Générer la pile 🃏 ==========
    pileHTML = document.createElement('div');
    pileHTML.classList = 'pile__container';
    console.log(game.pile);
    pileHTML.innerHTML += `
    <div class="card card--deck">
            <img src="img/cards/${game.pile[0].name}${game.pile[0].symbol}.png" alt="card" class="card--pile">
    </div>
    `
    gameTableHTML.append(pileHTML);
     
    // ========== 🃏 Modifier le nom du joueur principal 🃏 ==========
    const playerContainer = gameTableHTML.querySelector('.player__name'); 
    playerContainer.textContent = playerName;
    playerContainer.parentElement.classList.add('player--main');
    console.log(game.players);

     // ========== 🃏 Générer bouttons joueur principal 🃏 ==========  

     // == BTN PLAY
     const btnPlay = document.createElement('div');
     btnPlay.classList = 'btn btn--play';
     btnPlay.innerText = "Play hand";
     playerContainer.parentElement.append(btnPlay);

     // == BTN END TURN
     const btnEndTurn = document.createElement('div');
     btnEndTurn.classList = 'btn btn--end';
     btnEndTurn.innerText = "End turn";
     playerContainer.parentElement.append(btnEndTurn);
 
})

function triggerAITurns() {
    if (game.currentPlayerIndex !== 0) {
      game.playTurn();
    }
  }
  
   
// ========== 💥💥 Event click SELECT CARD 💥💥 ==========
gameTableHTML.addEventListener('click', (e) => {
    card = e.target.closest('.card--hand');
    cardName = e.target.dataset.name;
    cardSymbol = e.target.dataset.symbol;
  
    if (!card) return;
  
    const playerContainer = card.closest('.player--main');
    if (playerContainer) {
      // Mise à jour logique
      game.players[0].selectCard(cardName, cardSymbol);
  
      // Mise à jour visuelle
      document.querySelectorAll('.player--main .card--hand').forEach(c => {
        c.classList.remove('selected');
      });
  
      game.players[0].selectedCards.forEach(selected => {
        // Trouver la carte DOM correspondante
        document.querySelectorAll('.player--main .card--hand img').forEach(img => {
          if (
            img.dataset.name === selected.name &&
            img.dataset.symbol === selected.symbol
          ) {
            img.closest('.card--hand').classList.add('selected');
          }
        });
      });
    
    }
  });

  function UpdateHand() {
    let handContainerHTML  = document.querySelector('.player__hand');
    handContainerHTML.innerHTML = ``;
    for (let card of game.players[0].hand){
        handContainerHTML.innerHTML += `
        <div class="card card--hand">
            <img src="img/cards/${card.name}${card.symbol}.png" alt="card" data-name="${card.name}" data-symbol="${card.symbol}">
        </div>`
    }
  }
  function UpdateDeck() {
    if (!deckHTML) return;
    deckHTML.innerHTML = '';
    for (let i = 0; i < game.deck.length; i++) {
      deckHTML.innerHTML += `
        <div class="card card--deck">
          <img src="img/cards/card-back.png" alt="card" class="card--back">
        </div>`;
    }
  }
  
  function UpdatePile() {
    if (!pileHTML || game.pile.length === 0) return;
    const top = game.pile[game.pile.length - 1];
    pileHTML.innerHTML = `
      <div class="card card--deck">
        <img src="img/cards/${top.name}${top.symbol}.png" alt="card" class="card--pile">
      </div>`;
  }
  


// ========== 💥💥 Event click BTN PLAY 💥💥 ==========
gameTableHTML.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn--play')) {
      const currentPlayer = game.players[0];
  
      if (
        currentPlayer.selectedCards.length > 0 &&
        currentPlayer.canPlay(currentPlayer.selectedCards[0], game.pile)
      ) {
        currentPlayer.play(game.pile);
        currentPlayer.clearSelection();
        currentPlayer.draw(game.deck);
      } else {
        currentPlayer.pickUpPile(game.pile);
      }
  
      game.nextTurn();
      UpdateHand();
      UpdatePile();
      UpdateDeck();
      triggerAITurns();
    }
  });
  
