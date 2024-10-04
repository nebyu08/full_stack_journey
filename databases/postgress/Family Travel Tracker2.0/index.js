import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "123456",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = 1;

let users = [];

async function getCounties() {
  const result = await db.query("SELECT * FROM visited_countries JOIN users on users.id=user_id where user_id=$1; ",[currentUserId]);
  const countries=[]
  result.rows.forEach((country)=>{
    countries.push(country.country_code);
  })

  return countries;
}

async function getUser() {
    const result=await db.query('SELECT * FROM users');
    users=result.rows;
    
   return result.rows.find((user)=>user.id==currentUserId);
}


app.get("/", async (req, res) => {
  const countries = await getCounties();
  const currentUser=await getUser();

  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    color: currentUser.color,
  });
});

app.post("/add", async (req, res) => {
  const input = req.body["country"];

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );

    const data = result.rows[0];
    const countryCode = data.country_code;
    try {
      await db.query(
        "INSERT INTO visited_countries (country_code,user_id) VALUES ($1,$2)",
        [countryCode,currentUserId]
      );
      res.redirect("/");
    }catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/user", async (req, res) => {
  //branch into displaying new webpage or accessing user
  if(req.body.add==="new"){
    res.render('new.ejs');
  }else{
    currentUserId=req.body['user']
    res.redirect("/")
  }
  
});

app.post("/new", async (req, res) => {
  const name=req.body['name'];
  const color=req.body['color'];

  //insert values into the database
  const result=await db.query("INSERT INTO users (name,color) VALUES($1,$2) RETURNING * ",[name,color]);
  console.log(result);

  const id=result.rows[0].id;
  currentUserId=id;
  res.redirect("/");

});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
