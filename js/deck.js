class Card {
    constructor(type, prop) {
        this.type = type // 카드 타입
        this.rank = type.substr(0, 1) // 카드 번호
        this.suit = type.substring(1, 2) // 카드 문양

        this.metaNumber = { // 점수 계산을 위한 데이터
            T: 10,
            J: 11,
            Q: 12,
            K: 13,
            A: 1
        }

        this.setProp(prop)
    }
    setProp(prop) { // 카드 엘리먼트 연결
        this.prop = prop
        if (prop)
            this.prop.controller = this
    }
    getType() { // 타입 가져오기
        return this.type
    }
    getNumber() { // 점수 가져오기
        if (!isNaN(parseInt(this.rank)))
            return parseInt(this.rank)
        else
            return this.metaNumber[this.rank]
    }
    getRank() { // 랭크 가져오기
        return this.rank
    }
    getSuit() { // 문양 가져오기
        return this.suit
    }
    getImage() { // 이미지 가져오기
        return Deck.internal_GetCardImgUrl(this)
    }
    show() { // 카드 펼치기
        this.prop.src = this.getImage()
    }
    hidden() { // 카드 숨기기
        this.prop.src = "./img/cardback.png"
    }
}

class Deck {
    constructor() {
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
        ] // 40장 덱 구성
        this.metaRank = [2, 3, 4, 5, 6, 7, 8, 9, "T", "H", "Q", "K", "A"] // 랭크 데이터
        this.metaSuiting = {
            c: "clubs",
            d: "diamonds",
            h: "hearts",
            s: "spades"
        } // 문양 데이터
    }
    static internal_FixTheRanking(rank) { // 카드의 랭크 가져오기
        return this.metaRank[rank];
    }
    static internal_FixTheSuiting(suit) { // 카드의 문양 가져오기
        return this.metaSuiting[suit]
    }
    static internal_GetCardImgUrl(card) { // 카드의 이미지 가져오기
        return `./img/${card.getRank()+card.getSuit()}.png`;
    }
    shuffle() { // 덱 섞기
        this.nextCard = 0;
        var shuffledDeck = [];

        for (var i = 0; i < 52; i++) {
            var random_card = this.cards.splice(Math.floor(Math.random() * this.cards.length), 1);
            shuffledDeck = shuffledDeck.concat(random_card);
        }
        this.cards = shuffledDeck;
    }
    draw(num) { // 카드 뽑기 (입력한 num만큼)
        if (num) {
            var out = []
            for (let i = 0; i < num; i++) {
                var rand = Math.floor(Math.random() * this.cards.length)
                out.push(new Card(this.cards.splice(rand, 1)[0]))
            }
            return out
        } else {
            var rand = Math.floor(Math.random() * this.cards.length)
            return new Card(this.cards.splice(rand, 1)[0])
        }
    }
}