;(function() {

  var card1 = document.getElementsByClassName('card1')[0];
  var card2 = document.getElementsByClassName('card2')[0];
  var winner = document.getElementsByClassName('winner')[0];

  var button = document.createElement('input');
  button.type = 'submit';
  button.value = 'Click for new cards!';
  document.getElementsByClassName('main')[0].appendChild(button);

  var winnerButton = document.createElement('input');
  winnerButton.type = 'submit';
  winnerButton.value = 'Click to determine who won!';
  document.getElementsByClassName('main')[0].appendChild(winnerButton);

  Card = {}

  Card.Model = function (rank, suit) {
    this.rank = rank;
    this.suit = suit;
  };

  Card.Model.prototype.compareTo = function(otherCard) {
    var thisRank = Card.Model.ranks[this.rank];
    var otherRank = Card.Model.ranks[otherCard.rank];
    return (thisRank < otherRank ? 1 :
    thisRank === otherRank ? 0 : -1);
  };

  Card.Model.prototype.setView = function (view) {
    this.view = new Card.View(this);
  }

  Card.Model.ranks = {
    ace: 1,
    king: 2,
    queen: 3,
    jack: 4,
    ten: 5,
    nine: 6,
    eight: 7,
    seven: 8,
    six: 9,
    five: 10,
    four: 11,
    three: 12,
    two: 13
  };

  Card.Model.suits = [
    'clubs', 'diamonds', 'hearts', 'spades'
  ]

  Card.View = function (model) {
    this.imgSrc = 'img/'+model.rank+'-of-'+model.suit+'.png';
  }


  Card.View.prototype.setBackgroundOf = function (elt) {
    elt.style.backgroundImage = 'url("' + this.imgSrc + '")';
  }

  var randomInt = function (int) {
    return Math.floor(int * Math.random());
  }

  var pickARank = function () {
    return Object.keys(Card.Model.ranks)[randomInt(13)];
  }

  var pickASuit = function() {
    return Card.Model.suits[randomInt(4)];
  }

  function Game () {
    this.player1 = undefined;
    this.player2 = undefined;
  }

  Game.prototype.generateRandomCard = function() {

    var theCard = new Card.Model(
      pickARank(),
      pickASuit()
    )
    theCard.setView();
    return theCard;

  }

  Game.prototype.drawNewCards = function() {

    this.player1 = this.generateRandomCard();
    this.player2 = this.generateRandomCard();

    this.player1.view.setBackgroundOf(card1);
    this.player2.view.setBackgroundOf(card2);

  }

  Game.prototype.determineWinner = function () {
    var player1 = this.player1;
    var player2 = this.player2;
    if (player1.compareTo(player2) === 1) {
      winner.innerText = 'Player One Wins!';
    } else if (player1.compareTo(player2) === 0) {
      winner.innerText = 'It\'s a Tie!!';
    } else { winner.innerText = 'Player Two Wins!'; }
  }

  var game = new Game()

  button.addEventListener('click', game.drawNewCards.bind(game));
  winnerButton.addEventListener('click', game.determineWinner.bind(game));

  game.drawNewCards()
  game.determineWinner()

})()
