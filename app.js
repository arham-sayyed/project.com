const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 80;

// middlewares
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname , "static")))

// set view engine and directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// import routes
const homeRoutes = require(path.join(__dirname, 'routes', 'homeRoutes'));
const aboutRoutes = require(path.join(__dirname, 'routes', 'aboutRoutes'));
const headingsRoutes = require(path.join(__dirname, 'routes', 'headingsRoutes'));
const inputRoutes = require(path.join(__dirname, 'routes', 'inputRoutes'));


// use routes
app.use('/home', homeRoutes);
app.use('/about', aboutRoutes);
app.use('/headings', headingsRoutes);
app.use('/input', inputRoutes);



app.get("/", (req, res) => {
    // res.sendFile(path.join(__dirname, "public/index.html"))
    res.render("index");
});

app.listen(
    PORT,
    console.log(`server started at port: ${PORT}`)
);
