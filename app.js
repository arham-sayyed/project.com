const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 80;

app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname , "static")))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));




app.get("/", (req, res) => {
    // res.sendFile(path.join(__dirname, "public/index.html"))
    res.render("index");
});

app.get("/home", (req, res) => {
    console.log(req.body.idToken)
    res.render("home",  { wikiname: 'sloth', name: 'arham' })
})

app.post("/home", (req, res) => {
    const data = req.body;
    console.log(data);
    res.status(200).send({message: "data received"})
})

app.listen(
    PORT,
    console.log(`server started at port: ${PORT}`)
);
