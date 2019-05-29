class Player {
    constructor(prop, _id) {
        this.money = 1000
        this.beforeMoney = 1000
        this.allShow = false
        this.id = _id

        this.prop = {
            top: prop,
            hand: prop.children[0],
            money: prop.children[1].children[1].children[2],
        }
        this.init()
    }
    init() {
        this.isDie = false
        this.handCards = []
        this.prop.top.style.opacity = 1
        this.cardRender()
        this.moneyRender()
    }
    spendMoeny(money) {
        if (this.money - money >= 0) {
            this.money -= money
            this.moneyRender()
            return true
        } else
            return false
    }
    addMoney(money) {
        this.money += money
        this.moneyRender()
    }
    updateBeforeMoney() {
        this.beforeMoney = this.money
    }
    moneyRender() {
        this.prop.money.innerText = this.money
    }
    addCard(card) {
        if (this.handCards.length < 5)
            this.handCards.push(card)
        this.cardRender()
    }
    addCards(cards) {
        if (this.handCards.length + cards.length < 5)
            this.handCards = this.handCards.concat(cards)
        this.cardRender()
    }
    cardRender() {
        [...this.prop.hand.children].forEach(x => this.prop.hand.removeChild(x))
        this.handCards.forEach((x, idx) => {
            var img = document.createElement("img")
            img.classList.add("user__hand__card")
            img.src = x.getImage()
            x.setProp(img);
            if (idx >= 3 && !this.allShow) x.hidden()
            this.prop.hand.appendChild(img)
        })
    }
    openHand() {
        this.handCards.forEach(x => x.show())
    }
    die() {
        this.isDie = true
        this.prop.top.style.opacity = 0.5
    }
    highlight(color) {
        this.prop.top.style.border = `2px solid ${color || 'black'}`
    }
    highlightOff() {
        this.prop.top.style.border = "none"
    }
    getHandPower() {
        var tmp = []
        var fair = this.handCards.map((x, ix) => {
            if (tmp.indexOf(x.getNumber()) == -1) {
                tmp.push(x.getNumber())
                return {
                    rank: x.getNumber(),
                    count: this.handCards.filter(y => y.getNumber() == x.getNumber()).length
                }
            }
        })
        fair = fair.filter(x => x)
        fair.sort((a, b) => b.rank - a.rank)

        var st = 1
        var max = 1
        console.log("-----------------------------", this.id)
        var prev = fair[fair.length-1].rank
        for (let i = fair.length - 2; i >= 0; i--) {
            if (fair[i].rank-1 == prev){
                max++
                prev = fair[i].rank
            }
            else{
                if(max > st) st = max
                max = 1
                continue
            }
        }
        var high = fair[fair.length - 1].rank == 1 ? 14 : fair[0].rank
        if (st >= 5) {
            return 700 + high
        }
        else if (fair.filter(x => x.count >= 3).length) {
            return 600 + high
        }
        else if (st == 4) {
            return 500 + high
        }
        else if (fair.filter(x => x.count == 2).length == 2) {
            return 400 + high
        }
        else if (st == 3) {
            return 300 + high
        }
        else if (fair.filter(x => x.count == 2).length) {
            return 200 + high
        }
        else if (high) {
            return 100 + high
        }
    }
    getHandString() {
        var high = this.getHandPower() - Math.floor(this.getHandPower() / 100) * 100
        switch (Math.floor(this.getHandPower() / 100)) {
            case 7: return `5연속 스트레이트 [${high}]`
            case 6:
                return `트리플 [${high}]`
            case 5:
                return `4연속 스트레이트 [${high}]`
            case 4:
                return `투페어 [${high}]`
            case 3:
                return `3연속 스트레이트 [${high}]`
            case 2:
                return `원페어 [${high}]`
            case 1:
                return `하이랜더 [${high}]`
        }
    }
}