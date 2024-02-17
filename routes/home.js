const express = require('express');
const router = express.Router();

router
    .route("/")
    .get((req, res) => {
        res.render("../views/home", {wikiname: "sloth", name: "arham"})
    })

module.exports = router;