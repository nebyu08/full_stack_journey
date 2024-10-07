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
    const response=await db.query('select title from title');
    const row=response.rows;

    //get the images
    const imagePromise=row.map(async(element)=>{
        return await getImage(element.title);
    })

    const image=await Promise.all(imagePromise);

    //push data into the image database database
    image.forEach((element)=>{
        db.query('INSERT INTO bookcover(img) VALUES ($1)',[element]);
    } )

    console.log(image);

    res.render("index.ejs");

})

app.listen(port,()=>{
    console.log('Server is listening on port:',port);
})
