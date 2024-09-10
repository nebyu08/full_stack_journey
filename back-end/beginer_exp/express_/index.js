import express from "express";

const app=express();
const port=3000;

//root
app.get("/",(req,res)=>{
   res.send("<h1>Welcome Sir</h1>");
});

app.post("/register",(req,res)=>{
    res.sendStatus(201);
});

app.put("/user/nebs",(req,res)=>{
    res.sendStatus(200);
});

//patching
app.patch("user/nebs",(req,res)=>{
    res.sendStatus(201);
});

//delete
app.delete("user/nebs",(req,res)=>{
    res.sendStatus(200);
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