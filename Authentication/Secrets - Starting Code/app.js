import dotenv from 'dotenv';
dotenv.config()

import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const app=express();
const port=3000;
//const mongoose=enew Schema();

app.use(express.static('public'));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({
    extended:true
}))

//no of hash rounds
const saltRounds=10;


//connect to a databse
mongoose.connect("mongodb://localhost:27017/userDB");


//create a mongoose schema
const userSchema=new mongoose.Schema({
    email:String,
    password:String
})


//userSchema.plugin(encrypt,{secret:process.env.SECRET,encryptedFields:["password"] });

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

app.post("/register",(req,res)=>{
    
    //preparing to hash
    bcrypt.hash(req.body.password,saltRounds,function(err,hash){

        const newUser=new User({
            email:req.body.username,
            password:hash
        });
    
        //save to db
        newUser.save();

        res.render('secrets');

    } );
    
})

app.post("/login",async(req,res)=>{
    const username=req.body.username;
    const password=req.body.password;

    //check
    try{
        const foundUser=await  User.findOne({email:username});
        if(foundUser){
            const   result=await bcrypt.compare(password,foundUser.password);
            if(result){
                res.render('secrets');
            }else{
                res.status(401).send('Incorrect password');
            }
        }
        else{
            res.status(404).send('user not found');
        }
    }catch(err){
        console.log(err);
        res.status(500).send('Error during loging');
    }
    
})

app.listen(port,()=>{
    console.log('server listening on port ',port);
})