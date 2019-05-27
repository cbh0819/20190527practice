class PlayManager {
    constructor() {
        this.bet = 0
        this.isStart = false
        this.round = 1

        this.deck = new Deck()

        var users = document.getElementsByClassName("user")
        this.players = [...users].map(x => new Player(x))
        this.owner = this.players[3]

        this.mid = document.getElementById("mid")
    }
    start() {
        this.isStart = true
        this.betting(10)
        this.players.forEach(x => {
            x.addCards(this.deck.draw(3))
        })
        this.mid.innerText = this.bet
    }
    betting(num) {
        if (this.isStart) {
            var value = num || Math.floor(this.bet / 2)
            this.players.forEach(x => {
                if (x.isDie) return
                if (x.spendMoeny(value)) {
                    this.bet += value
                } else
                    x.die()
            })
            this.mid.innerText = this.bet
        }
    }
    go() {
        if (this.isStart && this.round < 3) {
            this.round++
            this.betting()
            this.deal()
        }
    }
    deal() {
        if (this.isStart) {
            this.players.forEach(x => {
                x.addCard(this.deck.draw())
            })
        }
    }
    die() {
        if (this.isStart)
            this.owner.die()
    }
}