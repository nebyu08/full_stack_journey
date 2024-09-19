const fs=require("fs");

// fs.writeFile("message.txt","this is the first node",(err)=>{
//     if(err) throw err;  //if there is an error it will through it
//     console.log("it has caused this error")
// })


//lets read file
fs.readFile('message.txt','utf-8',(err,data)=>{
    if(err){ 
        throw err;
    }
    console.log(data);
});