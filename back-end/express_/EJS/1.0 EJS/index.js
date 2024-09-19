import express from 'express';

const app=express();

app.get("/",(req,res)=>{
    
    const now=new Date();
    const day=now.getDay();

    const type="its a week day";
    const advice="its time to work hard";

    if(day === 0 || day === 6){
        type="its weeknd";
        advice="try to relax";
    }

    res.render("index.ejs",{
       dayType:type,
       advice:advice
    });
});

const port=3000;

app.listen(port,()=>{
    console.log(`sever listerning on this port:${port}`);
});


