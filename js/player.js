class Player {
    constructor(prop, _id) {
        this.money = 1000 // 플레이어 돈
        this.allShow = false // 모든 카드를 보여주는가?
        this.id = _id

        this.prop = {
            top: prop,
            hand: prop.children[0],
            money: prop.children[1].children[1].children[2],
        } // 플레이어 엘리먼트 객체
        this.init()
    }
    init() { // 값 초기화
        this.isDie = false
        this.handCards = []
        this.prop.top.style.opacity = 1
        this.cardRender()
        this.moneyRender()
    }
    spendMoeny(money) { // 돈 사용
        if (this.money - money >= 0) {
            this.money -= money
            this.moneyRender()
            return true
        } else
            return false
    }
    addMoney(money) { // 돈 추가
        this.money += money
        this.moneyRender()
    }
    moneyRender() { // 돈 HTML 갱신
        this.prop.money.innerText = this.money
    }
    addCard(card) { // 손패에 카드 추가
        if (this.handCards.length < 5)
            this.handCards.push(card)
        this.cardRender()
    }
    addCards(cards) { // 손패에 카드들 추가
        if (this.handCards.length + cards.length < 5)
            this.handCards = this.handCards.concat(cards)
        this.cardRender()
    }
    cardRender() { // 카드 HTML 출력
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
    openHand() { // 모든 손패 show()
        this.handCards.forEach(x => x.show())
    }
    die() { // 죽기
        this.isDie = true
        this.prop.top.style.opacity = 0.5
    }
    highlight(color) { // 플레이어 테두리 설정
        this.prop.top.style.border = `2px solid ${color || 'black'}`
    }
    highlightOff() { // 플레이어 테두리 없애기
        this.prop.top.style.border = "none"
    }
    getHandPower() { // 손패 점수 계산
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
        if (st >= 5) { // 5연속 스트레이트
            return 700 + high
        }
        else if (fair.filter(x => x.count >= 3).length) { // 트리플
            return 600 + high
        }
        else if (st == 4) { // 4연속 스트레이트
            return 500 + high
        }
        else if (fair.filter(x => x.count == 2).length == 2) { // 투페어
            return 400 + high
        }
        else if (st == 3) { // 3연속 스트레이터
            return 300 + high
        }
        else if (fair.filter(x => x.count == 2).length) { // 원페어
            return 200 + high
        }
        else if (high) { // 하이랜더
            return 100 + high
        }
    }
    getHandString() { // 손패 점수 문자열 가져오기
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