function isLeap(year) {
    year=Number(year)
    if(year%4===0 && year%400===0){
       return "the year is leap year."
    }
    else if(year%4===0 && year%100===0){
       return "the year is not leap year."
    }
    else{
        return "not a leap year"
    }
}


var year=prompt("Enter Year")
var response=isLeap(year)

alert(response)