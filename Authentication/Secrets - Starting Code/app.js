import dotenv from 'dotenv';
dotenv.config()

import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import session from 'express-session';
import passport from 'passport';
import passportLocalMongose from 'passport-local-mongoose';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import findOrCreate from 'mongoose-findorcreate';

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
    password:String,
    googleId:String
})

userSchema.plugin(passportLocalMongose);
userSchema.plugin(findOrCreate);

//userSchema.plugin(encrypt,{secret:process.env.SECRET,encryptedFields:["password"] });

const User= new mongoose.model("User",userSchema);   

passport.use(User.createStrategy());

passport.serializeUser(function(user,done){
    done(null,user.id);
});

passport.deserializeUser(async function(id,done){
   try{
    const user=await User.findById(id);
    done(null,user);
   }catch{
    done(err);
   }
})

//setting up the google authorization
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret:process.env.CLIENT_SECRETE ,
    callbackURL: "http://localhost:3000/auth/google/secrets"
  },
  function(accessToken, refreshToken, profile, cb) {
    //console.log(profile);
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));


app.get("/",(req,res)=>{
    res.render('home');
});

app.get("/auth/google",
    passport.authenticate('google',{scope:["profile"]})
);

app.get("/auth/google/secrets",
    passport.authenticate('google',{failureRedirect:'/login'}),
    function(req,res){
        res.redirect("/secrets");
    }
)

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