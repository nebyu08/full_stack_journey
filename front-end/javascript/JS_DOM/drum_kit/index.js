function makesound(check){
    switch(check){
        case 'w':
            var audio=new Audio('sounds/crash.mp3');
            audio.play();
            break;
        
        case 'a':
            var audio=new Audio('sounds/kick-bass.mp3');
            audio.play();
            break;
        
        case 's':
            var audio=new Audio('sounds/snare.mp3');
            audio.play();
            break;
        case 'd':
            var audio=new Audio('sounds/tom-1.mp3');
            audio.play();
            break;

        case 'j':
            var audio=new Audio('sounds/tom-2.mp3');
            audio.play();
            break;
        case 'k':
            var audio=new Audio('sounds/tom-3.mp3');
            audio.play();
            break;
        case 'l':
            var audio=new Audio('sounds/tom-4.mp3');
            audio.play();
            break;
        default:
            console.log(element)
}

}


for(var i=0;i<document.querySelectorAll('.drum').length;i++){
    document.querySelectorAll('.drum')[i].addEventListener("click",function (){
        var element=this.innerHTML;
        makesound(element);
        buttonAnimation(element);
    })
}

//event listener in js
document.addEventListener('keypress',function(event){
    var element=event.key;
    makesound(element);
    buttonAnimation(element);
})


function buttonAnimation(key){
    var button=document.querySelector('.'+key);
    button.classList.add('pressed');
    //lets turn off the animation after some time
    setTimeout(function(){
        button.classList.remove('pressed');
    },100);
}