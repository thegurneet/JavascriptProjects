var readlineSync = require('readline-sync');
const rl = readlineSync


module.exports = class Player { 
    constructor(name){
        this.name = name;
        this.score = 0;
        this.hand = [];
        this.sum = 0;
    }

    playerHitOrHold(playdeck){
        this.sum = hitOrHold(this.hand, this.sum, playdeck);
        console.log(this.sum)
    }

    sumHand(array){
        var total = array.reduce(function(sum,score){
            if(score === 'A' || score === 'Q' || score === 'K' || score === 'J') {  
                score = 10;
            }
            return sum + score;
        },0);
        this.sum = total;
    }
};

function hitOrHold(hand, sum, playdeck){ 
    var on = 3
    while(on > 2){ 
        let response = rl.question('\t Your current hand is ' + sum + ' do you want to Hit or Stay? Y/N')
        if(response === 'y'){
            var addToHand = playdeck.pop();
            hand.push(addToHand); 
            sum = sumCards(sum,addToHand);
            console.log(' Your card was ' + addToHand + ' and your score is ' + sum)

                if(sum > 21){
                    on = 1;
                }
        } else { 
             on = 1;
        }
    }
    return sum;
}

function sumCards(sum,addToHand){
    if(addToHand === 'A'){
        if(sum+10 > 21){
            addToHand = 1
        } else {
            addToHand = 10
        }
    }; 
    if(addToHand === 'Q' || addToHand === 'K' || addToHand === 'J'){
        addToHand = 10;
    }
    return (sum + addToHand);
}

