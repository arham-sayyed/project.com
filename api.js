const express = require('express');
const path = require('path');
const requestLoggerMiddleware = require( path.join(__dirname , 'middlewares/logger.js'));

const app = express();
const PORT = 80;

app.set('view engine', 'ejs');
app.use(requestLoggerMiddleware);

// require routes
const home = require(path.join(__dirname, "routes/home.js"));


// routing
app.use("/public/home", home);


app.listen(
    PORT,
    console.log(`🚀 Server Started At ${PORT}`)
);

app.get("/", (req, res) => {
    res.send("hi api is working")
})

// app.get("/public/home")