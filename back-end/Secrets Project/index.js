import express from 'express';
import axios from 'axios';

const app=express();
const URL="https://secrets-api.appbrewery.com/random";

app.use(express.static('public'));

const port=3000;

app.get('/',async(req,res)=>{
    const response=await axios.get(URL);
    
    const secretData=response.data.secret;
    const userName=response.data.username;
    try{
        res.render('index.ejs',{secret:secretData,user:userName});
    }catch(error){
        console.log(error.response.data);
        res.status(500)
    }
})

app.listen(port,()=>{
    console.log(`listening on the port ${port}`);
})