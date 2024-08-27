var fibbonaci=[]
var counter=0;

function fibbonaciCreater(num){
    while(counter<num){  
        if(fibbonaci.length<2){
            fibbonaci.push(counter);
        }
        else{
            var temp1=fibbonaci.length-1;
            var temp2=fibbonaci.length-2;
            
            var temp3=fibbonaci[temp1]+fibbonaci[temp2];
            fibbonaci.push(temp3);
        }

        counter++;
    }
}


fibbonaciCreater(14);
console.log(fibbonaci);