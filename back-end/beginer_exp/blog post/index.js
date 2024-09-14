import express from 'express';


const app=express();
const port=3000;

app.use(express.static('public'));

app.get('/',(req,res)=>{
    const images=[
        "img/StockCake-Baking Fresh Bread_1726300843.jpg",
        "img/StockCake-Cranberry Cooking Pot_1726300952.jpg",
        "img/StockCake-Futuristic Helmet Design_1726300923.jpg"   
    ];

    res.render('index.ejs',{images});
})

app.listen(port,()=>{
    console.log(`server listening on the port ${port}`);
})