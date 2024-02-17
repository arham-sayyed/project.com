const express = require('express');

const app = express();
const PORT = 80;

app.listen(
    PORT,
    console.log(`🚀 Server Started At ${PORT}`)
);

app.get("/", (req, res) => {
    res.send("hi api is working")
})

