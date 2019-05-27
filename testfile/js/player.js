class Player{
    constructor(prop){
        this.money = 1000
        this.prop = {
            top : prop,
            hand : prop.children[0],
            money: prop.children[1].children[1].children[2],
        }
        this.handCards = []

        this.moneyRender()
    }
    spendMoeny(money){
        if(this.money - money >= 0){
            this.money -= money
            this.moneyRender()
            return true
        }
        else
            return false
    }
    addMoney(money){
        this.money += money
        this.moneyRender()
    }
    moneyRender() {
        this.prop.money.innerText = this.money
    }
    addCard(card){
        if(this.handCards.length < 5)
            this.handCards.push(card)
        this.cardRender()
    }
    addCards(cards){
        if(this.handCards.length+cards.length < 5)
            this.handCards = this.handCards.concat(cards)
        this.cardRender()
    }
    cardRender(){
        this.handCards.forEach(x=>{
            var img = document.createElement("img")
            img.classList.add("user__hand__card")
            img.src = x.getImage()
            x.setProp(img)
            this.prop.hand.removeChild(this.prop.hand.children[0])
            this.prop.hand.appendChild(img)
        })
    }
}