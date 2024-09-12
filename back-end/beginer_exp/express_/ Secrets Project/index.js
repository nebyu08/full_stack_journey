import express from 'express';
import bodyParser from 'body-parser';
import {dirname} from 'path';
import {fileURLToPath} from 'url';

const __dirname=dirname(fileURLToPath(import.meta.url));

const app=express();
app.use(bodyParser.urlencoded({extended:true}));

//const __dirname=path.join(__dirname,'/secret.html');

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/public/index.html')
});

app.post('/check',(req,res)=>{
   if(req.body.password ==='ILoveProgramming'){
        console.log("your correct mate");
        res.sendFile(__dirname+'/public/secret.html');
   }
   else{
     res.sendFile(__dirname+'/public/index.html');
    }
});

const port=3000;
app.listen(port,()=>{
    console.log(`server is listening on:${port}`);
})