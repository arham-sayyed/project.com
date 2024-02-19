const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();
const PORT = 80;

app.use(cookieParser());

app.use(express.static(path.join(__dirname , "static")))




app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"))
});

app.listen(
    PORT,
    console.log(`server started at port: ${PORT}`)
);
