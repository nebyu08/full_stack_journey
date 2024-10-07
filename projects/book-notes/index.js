import express from 'express';
import bodyParser from 'body-parser';
import axios, { Axios } from 'axios';

const app=express();
const port=3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));


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
    const title='Light';
    const imgSrc=await getImage(title);

    res.render("index.ejs",{imgSrc});
})

app.listen(port,()=>{
    console.log('Server is listening on port:',port);
})
