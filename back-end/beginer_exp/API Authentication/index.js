import express from "express";
import axios from "axios";
import { render } from "ejs";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

const yourUsername = "nebiti2";
const yourPassword = "nebiti2";
const yourAPIKey = "9a5523a5-a87c-40f7-84fd-2edf7cc3ec41";
const yourBearerToken = "ae17d6e5-f617-4421-be82-191a883e3b01";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async(req, res) => {
    try{
      const response=await axios.get('https://secrets-api.appbrewery.com/random');
      res.render('index.ejs',{content:JSON.stringify(response.data)});
    }catch(error) {
      res.status(404).send("the following error came",error)
    }
    
});

app.get("/basicAuth", async(req, res) => {
  const url='https://secrets-api.appbrewery.com/all?page=2';

  try{
    const response=await axios.get(url,{
      auth:{
        username:yourUsername,
        password:yourPassword
      }
  }
);
  res.render('index.ejs',{content:JSON.stringify(response.data[0])});
  }
  catch(error){
      res.status(404).send('Unexpected Error',error.message);
  }
});

app.get("/apiKey", async(req, res) => {
  try{
    const response=await axios.get(API_URL+`filter?score=7&apiKey=${yourAPIKey}`)
    res.render("index.ejs",{content:JSON.stringify(response.data)});
  }catch(error){
    res.status(404).send('Unexpected Error',error.message);
  }
});

const config={
      headers:{ Authorization:`Bearer ${yourBearerToken}`},
};

app.get("/bearerToken", async(req, res) => {
    try{
      const response=await axios.get(API_URL+'secrets/2',config);
      res.render("index.ejs",{content:JSON.stringify(response.data)});
    }
    catch(error){
      res.status(404).send('Unexpected Error',error.message);
    }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
