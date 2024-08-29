function displayLevel(level){
    $('h1').text("level"+" "+level);
}

function clickSound(charachter){
    switch(charachter){
        case 'b':
            var audio=new Audio();
            audio.src='sounds/blue.mp3';
            audio.play();
            break;
        case 'g':
            var audio=new Audio();
            audio.src='sounds/green.mp3';
            audio.play();
            break;
        case 'r':
            var audio=new Audio();
            audio.src='sounds/red.mp3';
            audio.play();
            break;
        case 'y':
            var audio=new Audio();
            audio.src='sounds/yellow.mp3';
            audio.play();
            break;
        default:
            console.log('none');

    }
}

function lost(){
    $('h1').text('game over.press any key to restart')
    $('body').css('background-color','red');
    //play the audio
    var audio=new Audio();
    audio.src='sounds/wrong.mp3';
    audio.play();
}

function charachter_checker(true_char){
        //button click
        var length=true_char.length;
        var i=0;
        while(i<length){
            $('button').on('click',function(event){
                var charachter=$(this).attr('id');
                //play the sound
                clickSound(charachter);
                //add the effect of play
                
                //...

                //comapre between values
                if(true_char!=true_char[i]){
                    lost();
                }

                i+=1;

            })
        }

        return true;    

}

function num_patter(num){
    var pattern=[];
    for(var i=0;i<num.length;i++){
        switch(num[i]){
            case 1:
                pattern.push('b');
                break;
            case 2:
                pattern.push('g');
                break;
            case 3:
                pattern.push('r');
                break;
            case 4:
                pattern.push('y');
                break;
        }
    }

    return pattern;
}



function game(){
    var state='ongoing';
    var level=1;

    var rnd_numbers=[];
    var charachter=[]; //charachter pattern

    while(state==='ongoing'){
        var random=Math.floor(Math.random()*4+1);

        //lets append some values
        rnd_numbers.push(random);

        //charachter
        var pattern


    }


}

$(document).keypress(function(event){
    if(event.key!=''){
        game();
    }
});