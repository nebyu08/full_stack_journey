import express from "express";
import bodyParser from "body-parser";
import pg from 'pg';

//connect to the database
const db=new pg.Client({
  user:'postgres',
  host:'localhost',
  database:'permalist',
  password:'123456',
  port:5432
})

db.connect();

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//get data from db
async function getData() {
  const result=await db.query('SELECT * FROM item');
  const items=result.rows;
  return items;
}

app.get("/", async(req, res) => {
  const items=await getData();

  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
});

app.post("/add", async(req, res) => {
  const item = req.body.newItem;
  //insert
  try{
   await db.query('INSERT INTO item(title) VALUES ($1)',[item]);
  }catch(err){
    console.error('Error occured is ',err);
  }
  res.redirect("/");
});

app.post("/edit", async(req, res) => {
  const todo=req.body.updatedItemTitle;
  const chosenId=req.body.updatedItemId;
  try{
    await db.query('UPDATE item set title= ($1) where item.id=$2',[todo,chosenId]);
    res.redirect("/");
  }catch(err){
    console.error('Error occured is ',err);
  }

});

app.post("/delete", async(req, res) => {
  var selectedId=req.body.deleteItemId;
  try{
    await db.query("DELETE FROM item where item.id=$1",[selectedId]);
    res.redirect("/");
  }catch(err){
    console.error('This occured,',err);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
