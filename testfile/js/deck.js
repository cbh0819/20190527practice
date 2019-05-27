/**
 * The deck "class"
 */

var Deck.cardinfo=function () {
    this.nextCard = 0;
    this.cards = ['As', 'Ah', 'Ad', 'Ac',
        'Ks', 'Kh', 'Kd', 'Kc',
        'Qs', 'Qh', 'Qd', 'Qc',
        'Js', 'Jh', 'Jd', 'Jc',
        'Ts', 'Th', 'Td', 'Tc',
        '9s', '9h', '9d', '9c',
        '8s', '8h', '8d', '8c',
        '7s', '7h', '7d', '7c',
        '6s', '6h', '6d', '6c',
        '5s', '5h', '5d', '5c',
        '4s', '4h', '4d', '4c',
        '3s', '3h', '3d', '3c',
        '2s', '2h', '2d', '2c'];
};

function internal_FixTheRanking(rank) {
    if (rank == 14) {
        rank = 'A';
    } else if (rank == 13) {
        rank = 'K';
    } else if (rank == 12) {
        rank = 'Q';
    } else if (rank == 11) {
        rank = 'J';
    } else if (rank == 10) {
        rank = 'T';
    } else if (rank == 9) {
        rank = '9';
    } else if (rank == 8) {
        rank = '8';
    } else if (rank == 7) {
        rank = '7';
    } else if (rank == 6) {
        rank = '6';
    } else if (rank == 5) {
        rank = '5';
    } else if (rank == 4) {
        rank = '4';
    } else if (rank == 3) {
        rank = '3';
    } else if (rank == 2) {
        rank = '2';
    }
    return rank;
}

function internal_FixTheSuiting(suit) {
    if (suit == 'c') {
        suit = 'clubs';
    } else if (suit == 'd') {
        suit = 'diamonds';
    } else if (suit == 'h') {
        suit = 'hearts';
    } else if (suit == 's') {
        suit = 'spades';
    } else {
        alert('Unknown suit ' + suit);
    }

    return suit;
}
//Show each player's card img on board
function internal_GetCardImgUrl(card) {
    var suit = card.substring(0, 1);
    var rank = card.substring(1);

    return "url('./img/" + rank + suit + ".png')";
}

function internal_setBackground(diva, image) {
    var komage = diva.style;
    komage['background-image'] = image;
}

function internal_setCard(diva, card) {
    // card may be "" -> do not show card
    //             "blinded" -> show back
    //             "s14" -> show ace of spades
    var image;
    if (typeof card == 'undefined' || card == "") {
        image = "url('img/outline.gif')";
    } else if (card == "blinded") {
        image = "url('img/cardback.png')";
    } else {
        image = internal_GetCardImgUrl(card);
    }

    internal_setBackground(diva, image);
}

// Method that shuffles the deck
function shuffle(){
    // Going back to the top of the deck
    this.nextCard = 0;
    var shuffledDeck = [];

    for( var i=0 ; i<52 ; i++ ) {
        var random_card = this.cards.splice( Math.floor( Math.random() * this.cards.length ), 1 );
        shuffledDeck = shuffledDeck.concat( random_card );
    }
    this.cards = shuffledDeck;
};

// Method that returns the next x cards of the deck
function deal( numberOfCards ) {
    var dealtCards = [];
    for( var i=0 ; i<numberOfCards && this.nextCard<52 ; i++ ) {
        dealtCards.push( this.cards[this.nextCard] );
        this.nextCard++;
    }
    return dealtCards;
};

//module.exports = Deck;