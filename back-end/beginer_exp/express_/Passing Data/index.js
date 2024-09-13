import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from 'url';
import path from 'path';

// const __dirname=dirname(fileURLToPath(import.meta.url));
// console.log(dirname);

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render('index.ejs');
});

app.post("/submit", (req, res) => {
  const fname=req.body['fName'];
  const lname=req.body['lName'];
  const totaLength=fname.length+lname.length;
  
  console.log(totaLength);

  //return total length
  res.render('index.ejs',{totaLength:totaLength});

});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
