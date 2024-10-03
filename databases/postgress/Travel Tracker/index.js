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
  //get data from countries table
  try{
    const inputData=req.body.country;
    const result=await db.query("SELECT country_code FROM countries WHERE LOWER(country_name) = $1 ",[inputData.toLowerCase()]);
    const accronym=result.rows[0].country_code;
    
    //add data into visited_countries
    await db.query('INSERT INTO visited_countries(country_code) VALUES ($1) ',[accronym]);

    res.redirect('/');
  }
  catch(err){
    console.error('error occured is,',err);
  }

})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
