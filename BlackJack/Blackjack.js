const Player = require('./player.js');
var readlineSync = require('readline-sync');


/* 
    1.Start by creating 2 players : enter name. 
    2.Shuffle deck of 52 cards.  [array of cards [A,A,A,A,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6,7,7,7,7,8,8,8,8,9,9,9,9,10,10,10,10,J,J,J,J,Q,Q,Q,Q,K,K,K,K]]
    3. Player 1 gets 2 cards , Player 2 get 2 cards
    4. Player one turn hit or hold. 
        4.1. if Hit add card and sum, if sum > 21 -> out. score = 0; 
        4.2  if hold keep score move on to next player. 
    5. repeat for Player 2. 
    6. if both score = 1; then Sum vs Sum. Lower sum => score = 0

    if score of any player = 3; GAME OVER;
*/

const rl = readlineSync
const player1 = new Player(); 
const player2 = new Player(); 
const players = [player1,player2];
var playDeck;
getNames();


function startGame(){
    playDeck = ['A','A','A','A',2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6,7,7,7,7,8,8,8,8,9,9,9,9,10,10,10,10,'J','J','J','J','Q','Q','Q','Q','K','K','K','K']
    player1.sum = 0;
    player1.hand = [];
    player2.sum =0;
    player2.hand =[]
    giveCards();
    currentScores();
    hitOrHold();
}

function getNames(){
    player1.name = rl.question('What is your name Player 1? ');
    player2.name = rl.question('what is your name Player 2? ')
}

function currentScores(){
    console.log('\n________________________________________________________')
    console.log('SCORES: ' + player1.name + ':  ' + player1.score + ' | ' + player2.name + ':  ' + player2.score  + '\n')
    console.log('HAND: ' + player1.name + ':  ' + player1.hand + ' _ ' + ' Total : '  + player1.sum + ' | ' + player2.name + ':  ' + player2.hand + ' _ '+ ' Total : '  + player2.sum)
}

function giveCards(){
    shuffle(playDeck)
    players.map(function(player){
        var value = 0; 
        while(value < 2){
            player.hand.push(playDeck.pop())
            value++
        }
        player.sumHand(player.hand);
    })
}

function shuffle(array){
    array.sort(()=>Math.random() - 0.5);
}

function hitOrHold(){
    console.log('\n' + player1.name + ' it is your turn: ')
    player1.playerHitOrHold(playDeck)
    console.log('\n' + player2.name + ' it is your turn: ')
    player2.playerHitOrHold(playDeck)
    compare();
    currentScores();

    if(player1.score < 3 && player2.score < 3){
        startGame();
    } else {
        winner();
    }
}

function compare(){
    if(player1.sum === player2.sum ){
        return;
    }
    if(player1.sum > player2.sum && player2.sum < 21 && player1.sum < 21){
        player1.score += 1;
    }
    if(player1.sum < 21 && player2.sum > 21){
        player1.score += 1;
    }
    if(player2.sum > player1.sum && player2.sum < 21 && player1.sum < 21){
        player2.score += 1;
    }
    if(player2.sum < 21 && player1.sum >21){
        player2.score +=1
    }
    return;

}

function winner(){
    player1.score === 3 ? 
    console.log(player1.name + ' Is the Winner'):
    console.log(player2.name + ' IS THE WINNERRRR')
}

startGame();

