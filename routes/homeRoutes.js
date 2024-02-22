const path = require('path');
const express = require('express');
const router = express.Router();

const homeControllers = require(path.join(__dirname, '..' , 'controllers', 'homeControllers'));


router.get('/', homeControllers.renderHomePage);

router.post('/', (req, res) => {
    const data = req.body;
    console.log(data);
    res.status(200).send({message: 'Data received'});
})

module.exports = router;