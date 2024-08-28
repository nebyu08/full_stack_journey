//if its reloaded the header message is changed
function refresh_checker(){
    const perfEntries=performance.getEntriesByType("navigation");

    if(perfEntries.lenght>0 && perfEntries[0].type==='relo'){
        return true;

    }else{
       return false;
    }
}

function generate_random(){
    var players=[];
    
    var player1=Math.floor(Math.random()*6+1);
    var player2=Math.floor(Math.random()*6+1);
    
    //append the values
    players.push(player1);
    players.push(player2);

    return players;
}

function change_header(player){
    var header=document.querySelector('h1'); 
    if(player==='player1'){  
        header.textContent='player 1 wins!';
    }
    else if(player==='player2'){
        header.textContent='player 2 wins!';
}
    else{
        header.textContent='its a tie!'
    }

}


function rolled_image(num1,num2){
    var player1_img=document.querySelector('.player1 img');
    var player2_img=document.querySelector('.player2 img');

    //for the first player
    if(num1===1){
        player1_img.src='images/dice1.png';
    }
    else if(num1==2){
        player1_img.src='images/dice2.png';
    }
    else if(num1===3){
        player1_img.src='images/dice3.png';
    }
    else if(num1===4){
        player1_img.src='images/dice4.png';
    }
    else if(num1==5){
        player1_img.src='images/dice5.png';
    }
    else{
        player1_img.src='images/dice6.png';
    }

    //for the second player
    if(num2===1){
        player2_img.src='images/dice1.png';
    }
    else if(num2==2){
        player2_img.src='images/dice2.png';
    }
    else if(num2===3){
        player2_img.src='images/dice3.png';
    }
    else if(num2===4){
        player2_img.src='images/dice4.png';
    }
    else if(num2==5){
        player2_img.src='images/dice5.png';
    }
    else{
        player2_img.src='images/dice6.png';
    }
}

function roll_dice(){
    var players=generate_random();
    var player1=players[0];
    var player2=players[1];

    var rereshed=refresh_checker();
    if(rereshed){
        //lets generate the image
        rolled_image(player1,player2);

        if(player1>player2){
            //player 1 won
            change_header('player1');
        }
        else if(player2>player1){
            change_header('player2');
        }
        else{
            change_header('tie');
        }
    }
}

