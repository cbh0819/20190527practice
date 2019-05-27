class PlayManager{
    constructor(){
        this.bet = 10;

        this.deck = new Deck()

        var users = document.getElementsByClassName("user")
        this.players = [...users].map(x => new Player(x))
        this.owner = this.players[3]

        this.mid = document.getElementById("mid")
    }
    start(){
        this.mid.innerText = this.bet

        this.players.forEach(x=>{
            x.addCards(this.deck.draw(3))
        })
    }
    betting() {
        if (this.owner.spendMoeny(Math.floor(this.bet / 2)))
            this.bet += Math.floor(this.bet/2)
        this.mid.innerText = this.bet
    }
}