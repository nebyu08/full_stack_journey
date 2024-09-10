//reveice input from user

import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';

const questions=[
    {
        type:'input',
        
        message:'Enter your Name',
        name:'URL'
    },  
]

inquirer.prompt(questions).then(answers=>{
    const url=answers.URL;

    const qr_image=qr.image(url,{type:"png"});  

    //save the image
    qr_image.pipe(fs.createWriteStream('qr_code.png'));

    //save user input text
    fs.writeFile('url.txt',url,(err)=>{
        if(err) throw err;
        console.log("the file has been saved");
    });

});
