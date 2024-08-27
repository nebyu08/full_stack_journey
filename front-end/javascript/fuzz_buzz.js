var output=[]
var count=1

function FizzBuzz() {  
    if(count%3===0 && count%5===0){
        output.push("Fizz");
    }
    else if(count%5===0){
        output.push("Buzz");
    }
    else if(count%3===0){
        output.push("FizzBuzz");
    }
    else{
        output.push(count);
    }
    console.log(output);

    count++;

}

FizzBuzz() 
FizzBuzz() 
FizzBuzz() 
FizzBuzz() 
FizzBuzz() 
FizzBuzz() 
FizzBuzz() 
FizzBuzz() 
FizzBuzz() 