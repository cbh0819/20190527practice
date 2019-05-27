class PlayManager{
    constructor(){
        this.bet = 10;

        var users = document.getElementsByClassName("user")
        this.players = [...users].map(x => new Player(x))
    }
    start(){

    }
}