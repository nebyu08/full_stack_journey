import express from "express";
import bodyParser from "body-parser";
import pg from 'pg';

const app = express();
const port = 3000;

//connect to a database
const db=new pg.Client({
  user:'postgres',
  host:'localhost',
  database:'world',
  password:'123456',
  port:5432
});

db.connect()


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) =>{
  try{
  const data=await db.query('SELECT * from visited_countries');
  const countries=data.rows;
  res.render('index.ejs',{countries:countries,total:countries.length});
  }
  catch(err){
    console.error('error fetching data',err);
    res.status(500).send('internal server error');
  }
});
app.post('/add',async(req,res)=>{
  try{
    const inputData=req.body.country;
    //add data
    
    db.query('INSERT INTO visited_countries(country_code) VALUES ($1)',[inputData]);;
    const data=await db.query('SELECT * FROM visited_countries');
    const countries=data.rows;

    res.render('index.ejs',{countries:countries,total:countries.length});
  }
  catch(err){
    console.error('error inserting data:',err);
  }
})



app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
