import dotenv from 'dotenv';
dotenv.config()

import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import session from 'express-session';
import passport from 'passport';
import passportLocalMongose from 'passport-local-mongoose';


const app=express();
const port=3000;
//const mongoose=enew Schema();

app.use(express.static('public'));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({
    extended:true
}))

app.use(session({
    secret:'the big band theory.',
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());



//connect to a databse
mongoose.connect("mongodb://localhost:27017/userDB");


//create a mongoose schema
const userSchema=new mongoose.Schema({
    email:String,
    password:String
})

userSchema.plugin(passportLocalMongose);


//userSchema.plugin(encrypt,{secret:process.env.SECRET,encryptedFields:["password"] });

const User= new mongoose.model("User",userSchema);   

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get("/",(req,res)=>{
    res.render('home');
});


app.get('/register',(req,res)=>{
    res.render('register');
});

app.get('/login',(req,res)=>{
    res.render('login');
});

app.get("/secrets",function(req,res){
    if(req.isAuthenticated()){
        res.render("secrets");
    }else{
        res.redirect("login");
    }
} ) 

app.post("/register",(req,res)=>{
    User.register({username:req.body.username},req.body.password,function(err,user){
        if(err){
            console.log(err);
            res.render("register");
        }else{
            passport.authenticate('local')(req,res,function(){
                res.redirect("/secrets");
            });
        }
    } );
});

app.post("/login",async(req,res)=>{
    const user= new User({
        username:req.body.username,
        password:req.body.password
    });
    req.login(user,function(err){
        if(err){
            console.log(err);
        }else{
            passport.authenticate("local")(req,res,function(){
                res.redirect("/secrets");
            })
        }
    })
})

app.get("/logout",function(req,res,next){
   req.logout(function(err){
    if(err){
        return next(err);
    }
    res.redirect("/");
    
   });
})  

app.listen(port,()=>{
    console.log('server listening on port ',port);
})