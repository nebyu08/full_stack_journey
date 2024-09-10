import express from "express";
import morgan from 'morgan';

const app = express();
const port = 3000;
//decalare some midleware
app.use(morgan('tiny'));

app.get("/", (req, res) => {
  res.send('hello there');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
