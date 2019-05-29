class PlayManager {
    constructor() {
        this.bet = 0

        this.mid = document.getElementById("mid")
        this.restartAble = false;

        var users = document.getElementsByClassName("user")
        this.players = [...users].map((x, idx) => new Player(x, idx))
        this.owner = this.players[3]
        this.owner.allShow = true

        this.resultPanel = document.getElementsByClassName("menu__result")[0]

        this.init()
    }
    init() {
        this.isStart = false
        this.round = 0
        this.currentTurn = 3
            ;[...this.resultPanel.children].forEach((x, idx) => {
                x.style.color = "black"
                if(idx == 3) x.style.color = "green"
                x.children[0].style.opacity = 1
                x.children[0].innerHTML = `Player ${idx + 1} : -`
                x.children[1].style.opacity = 1
                x.children[1].innerHTML = "(-)"
            })
        this.players.forEach(x => {
            x.init()
            x.highlightOff()
        })

        this.deck = new Deck()

    }
    start() {
        if (!this.isStart && !this.restartAble) {
            this.isStart = true
            this.betting(10)
            this.players.forEach(x => {
                x.addCards(this.deck.draw(3))
            })
            this.owner.highlight()
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
            } else { }
            var time = setTimeout(() => {
                this.betting(20)
                this.currentTurn++
                this.nextTurn()
            }, 1000)
        }
        if ((this.round > 3 || this.players.filter(x => x.isDie).length >= 3) && this.isStart) {
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
            this.restartAble = true
            var live = this.players.filter(x => !x.isDie)

            var win = []
            var max = 0
            live.forEach((x, idx) => {
                if (x.getHandPower() > max) {
                    win = [x]
                    max = x.getHandPower()
                }
                if (x.getHandPower == max) {
                    win.push(x)
                }
            })
            this.players.forEach(x => {
                x.openHand()
                    ;[...this.resultPanel.children].forEach((x, idx) => {
                        if (this.players[idx].isDie) {
                            x.children[0].style.opacity = 0.5
                            x.children[1].style.opacity = 0.5
                        }
                        x.children[0].innerHTML = `Player ${idx + 1} : ${this.players[idx].getHandPower()}`
                        x.children[1].innerHTML = "(" + this.players[idx].getHandString() + ")"
                    })
            })
            win.forEach((x, idx) => {
                ;[...this.resultPanel.children][x.id].style.color = "gold"
                x.addMoney(Math.floor(this.bet / win.length))
                x.highlight("gold")
                x.updateBeforeMoney()
            })
            this.bet = 0
            this.changeBet()
        }
    }
    changeBet() {
        this.mid.innerHTML = this.bet
    }
    resetHARD(){
        this.restartAble = false
        this.init()
    }
    reset() {
        if (this.restartAble) {
            this.restartAble = false
            this.init()
        }
    }
}