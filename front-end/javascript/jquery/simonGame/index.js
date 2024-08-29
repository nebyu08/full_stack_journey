//project is done using JQuery

function displayLevel(level){
    $('h1').text('Level' +' ' +level);
}

function initialGame(){
    $(document).keypress(function(event){
      if(event.key!=''){
        return 1;
      }
     });
}


function game(){
    var level=initialGame();
    console.log(typeof(level));
    if(level==1){
        //logic of the whole game

        displayLevel(level);


    }
}

game(); 