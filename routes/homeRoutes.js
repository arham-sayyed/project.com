const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('home', { wikiname: 'sloth', name: 'arham' });
})

router.post('/', (req, res) => {
    const data = req.body;
    console.log(data);
    res.status(200).send({message: 'Data received'});
})

module.exports = router;