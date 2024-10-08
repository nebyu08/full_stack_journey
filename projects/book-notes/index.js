import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import pg from 'pg';

const app=express();
const port=3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));

//connect to a database
const db=new pg.Client({
    user:'postgres',
    host:'localhost',
    database:'my_note',
    password:'123456',
    port:'5432'
})

db.connect();


async function getImage(title) {
    const url=`https://openlibrary.org/search.json?title=${encodeURIComponent(title)}`;
    const imageSize="L";
    try{    
        const response =await axios.get(url);
        if(response.data.docs.length>0 && response.data.docs[0].cover_i){
            const firstBook=response.data.docs[0];
            const coverId=firstBook.cover_i;
            const imgLink= `https://covers.openlibrary.org/b/id/${coverId}-${imageSize}.jpg`;

            return imgLink;
        }
    }
    catch(err){
        console.error('Error occured is: ',err);
    }
}


app.get("/",async(req,res)=>{

    //get data from title database and quer for its book cover
    const response=await db.query('select * FROM allbook');
    const row=response.rows;
        
    res.render("index.ejs",{books:row});

})

app.get("/books",async(req,res)=>{
    var query='SELECT * FROM allbook';
    const sort=req.query.sort;

    if(sort==='title_asc'){
        query+=' ORDER BY title ASC';
    }else if(sort==='title_desc'){
        query+=' ORDER BY title DESC';
    }

    const response=await db.query(query);
    const row=response.rows;

    res.render('index.ejs',{books:row});

})

app.get("/fullnote",async(req,res)=>{
    const id=req.query.id;
    const response=await db.query('SELECT * FROM allbook where id=$1',[id]);
    const row=response.rows[0];

    res.render('fullnote.ejs',{book:row});

})

app.get('/home',(req,res)=>{
    res.redirect("/");
})

app.listen(port,()=>{
    console.log('Server is listening on port:',port);
})
