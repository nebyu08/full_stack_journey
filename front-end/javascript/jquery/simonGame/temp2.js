function displayLevel(level){
    $('h1').text("level"+" "+level);
}

function clickSound(charachters){
    var i=0;
    var timeDelay=1000 //one second

    console.log("the click sound is being activated");

    charachters.forEach(function (charachter,index){
       setTimeout(function(){
        var audio=new Audio();
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
        console.log("i am clicking",charachter);

                audio.play().catch(function(error){
                console.error("this error happend",error);
            });
        });
    });
}

function clickEffect(element_ids){
    console.log("this is the click effect",element_ids);
  //lets add remove class
  $(document).ready(function(){
        $(element_ids).on('click',function(){
            var currnetButton=$(this);

            setTimeout(function(){
            currnetButton.addClass('clicked');
            console.log("is the effect on or what");
        },1000);

        currnetButton.removeClass('clicked');
        console.log("it has been removed");

        });
  })
  
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


