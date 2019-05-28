class PlayManager {
    constructor() {
        this.bet = 0

        this.mid = document.getElementById("mid")


        var users = document.getElementsByClassName("user")
        this.players = [...users].map(x => new Player(x))
        this.owner = this.players[3]
        this.owner.allShow = true
        this.owner.highlight()

        this.init()
    }
    init() {
        this.isStart = false
        this.round = 0
        this.currentTurn = 3

        this.deck = new Deck()

    }
    start() {
        if (!this.isStart) {
            this.isStart = true
            this.betting(10)
            this.players.forEach(x => {
                x.addCards(this.deck.draw(3))
            })
            this.changeBet()
        }
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
            this.changeBet()
        }
    }
    nextTurn(isBettingClick, isDieClick) {
        this.players.forEach((x, idx) => {
            if (this.currentTurn == idx) x.highlight()
            else x.highlightOff()
        })
        if (this.currentTurn == 3) {

            if (this.round >= 1 && !isBettingClick && this.players[this.currentTurn].handCards.length < 5) this.deal()
            this.round++
            if (!this.players[this.currentTurn].isDie) {
                if (isBettingClick) {
                    this.currentTurn = 0
                    this.betting(20)
                    this.nextTurn()
                }
                if (isDieClick) {
                    this.players[this.currentTurn].die()
                    this.currentTurn = 0
                    this.nextTurn()
                }
            } else {
                this.currentTurn = 0
                this.nextTurn()
            }
        } else if (this.players[this.currentTurn].isDie) {
            this.currentTurn = (this.currentTurn + 1) % 4
            this.nextTurn()
        } else {
            if (Math.random() < 0.1) { // 10%
                this.players[this.currentTurn].die()
            } else {}
            var time = setTimeout(() => {
                this.betting(20)
                this.currentTurn++
                this.nextTurn()
            }, 1000)
        }
        if (this.round > 3 && this.isStart) {
            if (time)
                clearTimeout(time)
            this.gameEnd()
        }
    }
    deal() {
        if (this.isStart) {
            this.players.forEach(x => {
                x.addCard(this.deck.draw())
            })
        }
    }
    ownerBetting() {
        if (this.currentTurn == 3 && this.isStart)
            this.nextTurn(1, null)
    }
    ownerDie() {
        if (this.currentTurn == 3 && this.isStart)
            this.nextTurn(null, 1)
    }
    gameEndEvent(callBack) {
        this.gameEndCallBack = callBack
    }
    gameEnd() {
        if (this.gameEndCallBack) this.gameEndCallBack()
        this.players.forEach(x => !x.isDie ? x.highlight("green") : x.highlightOff())
        this.result()
    }
    result() {
        if (this.isStart) {

            this.isStart = false
            var live = this.players.filter(x => !x.isDie).length
            this.players.forEach(x => {
                console.log(x.getHandPower()) // #TODO 승리방식 제작해야함
                x.openHand()
                if (!x.isDie) x.addMoney(Math.floor(this.bet / live))
                x.updateBeforeMoney()
            })
            this.bet = 0
            this.changeBet()
        }
    }
    changeBet() {
        this.mid.innerHTML = this.bet
    }
    reset() {
        this.init()
        this.players.forEach(x => x.init())
    }
}