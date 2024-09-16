import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);

const app=express();
const port=3000;

app.use(express.static('public'));
app.set('views',path.join(__dirname,'views/pages'));

app.set('view engine','ejs');

app.get('/',(req,res)=>{
    
    res.render('index');
})

app.listen(port,()=>{
    console.log(`server listening on the port ${port}`);
})