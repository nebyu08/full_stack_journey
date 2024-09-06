function displayLevel(level){
    $('h1').text("level"+" "+level);
}

function clickSound(charachters){
    var i=0;
    var audio=new Audio();
    var timeDelay=1000
    console.log("the click sound is being activated");

    charachters.forEach(function (charachter,index){
        switch(charachter)
        {
            case 'b':
                audio.src='sounds/blue.mp3';
                break;
            case 'g':
                audio.src='sounds/green.mp3';
                break;
            case 'r':
                audio.src='sounds/red.mp3';
                break;
            case 'y':
                audio.src='sounds/yellow.mp3';
                break;
            default:
                console.log('none');
        }
        setTimeout(function(){
            audio.play().catch(function(error){
                console.error();
            },index*timeDelay);
        })
       
    });
}

function clickEffect(element_ids){
    console.log("the click effect is being activated");
    var i=0;
    
    while (i<element_ids.length){
            var charachter=element_ids[i];
            $(charachter).addClass("clicked");
            setTimeout(function(){
                $(charachter).removeClass("clicked"),1000
            })
            i++;
    }   
}

function lost(){
    $('h1').text('game over.press any key to restart')
    $('body').css('background-color','red');
    //play the audio
    var audio=new Audio();
    audio.src='sounds/wrong.mp3';
    audio.play();
    
    //return game state
    return "gameover";
}

function patternChecker(true_char,player_pattern){
    for(var i=0;i<player_pattern.length;i++){
        if(true_char[i]!=player_pattern[i]){
            return "gameover";
        }
    }
    return "ongoing";        
}

function numberToPattern(numberPaterns){
    var pattern=[];
    for(var i=0;i<numberPaterns.length;i++){
        switch(numberPaterns[i]){
            case 1:
                pattern.push('g');
                break;
            case 2:
                pattern.push('r');
                break;
            case 3:
                pattern.push('y');
                break;
            case 4:
                pattern.push('b');
                break;
        }
    }
    return pattern;
}

function game(){
    //state game
    var state="ongoing";
    var level=1;

    //var playerInput=[];
    var gamePattern=[];
    var userPattern=[];
    var pattern=[];

    //generate the patterns to be shown
    while(level!=0){
        //lets display the level
        displayLevel(level)
        
        if(level>2){
            break;
        }
        
        //lets display the patches to be clicked
        pattern=generateGamePattern(pattern);
        gamePattern=numberToPattern(pattern);

        clickEffect(gamePattern);
        clickSound(gamePattern);

        level++;

    }

}

function generateGamePattern(pattern){
    var temp=Math.floor(Math.random()*4+1);
    pattern.push(temp);
    return pattern;
}

$(document).keypress(function(event){
    if(event.key!='') {
        console.log("you clicked: "+event.key);
        game();
    }
});