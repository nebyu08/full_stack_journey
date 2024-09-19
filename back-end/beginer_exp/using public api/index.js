import express from 'express';
import axios from 'axios';
import path from 'path';
import { fileURLToPath } from 'url';

const app=express();
const port=3000;
const URL_LINK="https://www.thecocktaildb.com/api/json/v1/1/random.php";
const __dirname=path.dirname(fileURLToPath(import.meta.url));

app.use(express.static('public'));

app.set('views',path.join((__dirname,'views')));
app.set('view engine','ejs');

app.get("/",async(req,res)=>{
    try{
        const response=await axios.get(URL_LINK); //strDrinkThumb, strIngredient2: 'Pineapple',strInstructions
        const data=response.data.drinks[0];
        
        res.render('index.ejs',{src:data.strDrinkThumb,text:data.strInstructions})
    }catch(error){
        console.error('the error is,',error);
    }
})

app.listen(port,()=>{
    console.log(`listening on port ${port}`);
})