function displayLevel(level){
    $('h1').text("level"+" "+level);
}

function clickSound(charachters){
    var i=0;
    var audio=new Audio();
    while (i<charachters.length){
            switch(charachters[i]){
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
            audio.play();
            i++;
    }
}

function clickEffect(element_ids){
    var i=0;
    while (i<element_ids.length){
            $(element_ids[i]).addClass("clicked");
            setTimeout(function(){
                $(element_ids[i]).removeClass("clicked"),100
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
    var counter=;

    //var playerInput=[];
    var gamePattern=[];
    var userPattern=[];
    var pattern=[];

    $('button').on('click',function(){

        //setup timer 
        setTimeout(function(){
            var char=$(this).attr('id');
            userPattern.push(char);

        },10000);

        console.log("user has clicked"+userPattern);
        
        //generate random number
        gamePattern=generateGamePattern(gamePattern);

        //change into charachters
        pattern=numberToPattern(gamePattern);
        
        //effect from the game
        clickSound(pattern);
        clickEffect(pattern);

        console.log("the buttons clicked are :"+userPattern);
        //console.log("the pattern that tobe clicked are:"+pattern)

        clickSound(userPattern);
        clickEffect(userPattern);
        

        //lets compare the length
        if(userPattern.length===pattern.length){
            //nothing happens
        }
        else{
            displayLevel(pattern.length);
            state=lost();
        }

        //check for the content 
        state=patternChecker(pattern,userPattern);


    })

    function generateGamePattern(gamePattern){
        if(gamePattern===0){
            return Math.floor(Math.random()*4+1);
        }
        else{
            var temp=Math.floor(Math.random()*4+1);
            gamePattern.push(temp);
            return gamePattern;
        }
    }
   
}


$(document).keypress(function(event){
    if(event.key!='') {
        console.log("you clicked: "+event.key);
        game();
    }
});