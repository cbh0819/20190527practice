class Player{
    constructor(prop){
        this.money = 1000
        this.prop = {
            top : prop,
            hand : prop.children[0],
            profile : prop.children[1]
        }

        console.log(this.prop)
    }
}