//if its reloaded the header message is changed
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
        header.textContent='player 1 wins! 🚩';
    }
    else if(player==='player2'){
        header.textContent='🚩 player 2 wins!';
}
    else{
        header.textContent='its a tie!'
    }
}

function rolled_image(num1,num2){
    var player1_img=document.querySelector('#img1');
    var player2_img=document.querySelector('#img2');

    //check wether the image element exist
    if(player1_img){
        console.log('the element exist');
    }
    else{
        console.log('the element doesnt exist')
    }

    player1_img.setAttribute('src','./images/dice'+num1+'.png');

    player2_img.setAttribute('src','./images/dice'+num2+'.png')

}

function roll_dice(){
    var players=generate_random();
    var player1=players[0];
    var player2=players[1];

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

document.addEventListener("DOMContentLoaded",()=> {
    const perfEntries=performance.getEntriesByType("navigation");
        if(perfEntries.length>0 && perfEntries[0].type==='reload'){
            //call this function when page is refreshed
            roll_dice();
        }
    });