class Card{
    constructor(type,prop){
        this.type = type;
        this.rank = type.substring(0, 1)
        this.suit = type.substring(1)

        this.prop = prop
    }
    getType(){
        return this.type
    }
    getRank(){
        return this.rank
    }
    getSuit(){
        return this.suit
    }
    getImage(){
        return Deck.internal_GetCardImgUrl(this)
    }
    show(){
        this.prop //"url('img/cardback.png')"
    }
}

class Deck{
    constructor(){
        this.nextCard = 0
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
            '2s', '2h', '2d', '2c'
        ]
        this.metaRank = [2, 3, 4, 5, 6, 7, 8, 9, "T", "H", "Q", "K", "A"]
        this.metaSuiting = {
            c : "clubs",
            d: "diamonds",
            h: "hearts",
            s: "spades"
        }
    }
    static internal_FixTheRanking(rank) {
        return this.metaRank[rank];
    }
    static internal_FixTheSuiting(suit) {
        return this.metaSuiting[suit]
    }
    static internal_GetCardImgUrl(card) {
        return `url('./img/${card.getRank()+card.getSuit()}.png')`;
    }
    // static internal_setBackground(diva, image) {
    //     var komage = diva.style;
    //     komage['background-image'] = image;
    // }
    // static internal_setCard(diva, card) {
    //     var image;
    //     if (typeof card == 'undefined' || card == "") {
    //         image = "url('img/outline.gif')";
    //     } else if (card == "blinded") {
    //         image = "url('img/cardback.png')";
    //     } else {
    //         image = internal_GetCardImgUrl(card);
    //     }
    //     internal_setBackground(diva, image);
    // }
    shuffle() {
        this.nextCard = 0;
        var shuffledDeck = [];

        for (var i = 0; i < 52; i++) {
            var random_card = this.cards.splice(Math.floor(Math.random() * this.cards.length), 1);
            shuffledDeck = shuffledDeck.concat(random_card);
        }
        this.cards = shuffledDeck;
    }
    deal(numberOfCards) {
        var dealtCards = [];
        for (var i = 0; i < numberOfCards && this.nextCard < 52; i++) {
            dealtCards.push(this.cards[this.nextCard]);
            this.nextCard++;
        }
        return dealtCards;
    }
}