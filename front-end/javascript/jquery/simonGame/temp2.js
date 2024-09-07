function displayLevel(level){
    $('h1').text("level"+" "+level);
}

function clickSound(charachters){
   var i=0;
   while(i<charachters.length){
    var charachter=charachters[i];
    var audio=new Audio();

    audio.src='sounds/'+charachter+'.mp3';

    //add a bit of pause
    setTimeout(function(){
        audio.play();
    },100);
    i++;
   };
}

function clickEffect(element_ids){
    var i=0;
    while(i<element_ids.length){
        var element=element_ids[i];
        $('#'+element).addClass('clicked');
        setTimeout(function(){
            $('#'+element).removeClass('clicked');
        },100);

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
    
    if(true_char.length!=player_pattern.length){
        return "gameover";
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

function generateGamePattern(pattern){
    var temp=Math.floor(Math.random()*4+1);
    pattern.push(temp);
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
    while(state==="ongoing"){
        //lets display the level
        displayLevel(level)
        
        if(level>4){
            break;
        }
        
        //lets display the patches to be clicked
        pattern=generateGamePattern(pattern);
        gamePattern=numberToPattern(pattern);

        clickEffect(gamePattern);
        clickSound(gamePattern);
        
        //user pattern
        $(':button').click(function(){
            var buttons=$(this).attr('id');
            console.log("the button clicked is",buttons);
            userPattern.push(buttons);

            clickEffect(userPattern);
            clickSound(userPattern);
            
        })

        //comparision
        setTimeout(function(){
            state=patternChecker(gamePattern,userPattern);
        },1000); 

        level++;

    }

}


$(document).keypress(function(event){
    if(event.key!='') {
        console.log("you clicked: "+event.key);
        game();
    }
});


