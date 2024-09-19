import express from "express";
import path from 'path';
import { dirname } from "path";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";

//handling file
const __dirname=dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

//handling middle ware
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname,'/public/index.html'));
});

app.post('/submit',(req,res)=>{
    const street=req.body['street'];
    const pet=req.body['pet'];
    const bandName=street+pet;

   res.send(`<h2> ${bandName}</h2>`);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
