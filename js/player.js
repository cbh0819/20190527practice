class Player {
    constructor(prop) {
        this.money = 1000
        this.allShow = false

        this.prop = {
            top: prop,
            hand: prop.children[0],
            money: prop.children[1].children[1].children[2],
        }
        this.init()
    }
    init(){
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
        this.handCards.forEach((x,idx) => {
            var img = document.createElement("img")
            img.classList.add("user__hand__card")
            img.src = x.getImage()
            x.setProp(img);
            if (idx >= 3 && !this.allShow) x.hidden()
            this.prop.hand.appendChild(img)
        })
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
}