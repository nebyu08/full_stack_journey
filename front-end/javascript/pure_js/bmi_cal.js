function BMI_cal(mass,height){ 
    return mass/(height*height)
}

mass=prompt("Enter mass:")
height=prompt("Enter height:")

bmi=Math.round(BMI_cal(mass,height))

console.log("your bmi is: "+bmi)
