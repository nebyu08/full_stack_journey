import express from "express";

const app=express();
const port=3000;

//root
app.get("/",(req,res)=>{
   res.send("<h1>Welcome Sir</h1>");
});

//about
app.get("/about",(req,res)=>{
    res.send("<h1>About Us</h1>")
});

app.get("/contact",(req,res)=>{
    res.send("<p>this is the coolest paragraph ever</p>");
});

//listen port
app.listen(port,()=>{
    console.log(`server runnning on ${port}`);
});


console.log("hello")