import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const app=express();
const port=3000;
//const mongoose=enew Schema();

app.use(express.static('public'));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({
    extended:true
}))


//connect to a databse
mongoose.connect("mongodb://localhost:27017/userDB");


const userSchema={
    email:String,
    password:String
};
const User= new mongoose.model("User",userSchema);   


app.get("/",(req,res)=>{
    res.render('home');
})


app.get('/register',(req,res)=>{
    res.render('register');
})

app.get('/login',(req,res)=>{
    res.render('login');
})

app.post("/register",async(req,res)=>{
    const newUser=new User({
        email:req.body.username,
        password:req.body.password
    });

    //save to db
    try{
        await newUser.save();
        res.render('secrets');
    }catch(err){
        console.log(err);
        res.status(500).send("Error Saving User.");
    }
})

app.post("/login",async(req,res)=>{
    const username=req.body.username;
    const password=req.body.password;

    try{
        const foundUser=await User.findOne({email:username});
        if(foundUser){
            if(foundUser.password===password){
                res.render('secrets');
            }
        }
    }catch(err){
        console.log(err);
    }
})

app.listen(port,()=>{
    console.log('server listening on port ',port);
})