const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();
const PORT = 80;

app.use(cookieParser());
app.use(express.static(path.join(__dirname , "static")))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));




app.get("/", (req, res) => {
    // res.sendFile(path.join(__dirname, "public/index.html"))
    res.render("index");
});

app.get("/home", (req, res) => {
    res.render("home",  { wikiname: 'sloth', name: 'arham' })
})

app.listen(
    PORT,
    console.log(`server started at port: ${PORT}`)
);
