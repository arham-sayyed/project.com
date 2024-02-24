const path = require('path');
const express = require('express');
const router = express.Router();

const homeControllers = require(path.join(__dirname, '..' , 'controllers', 'homeControllers'));

const data = {
    "project_name": {
        "h1textColor": "#661414",
        "h1bgColor": "#b98888",
        "border_h1": "inset"
    },
    "hr": {
        "hrColor": "#cd4242",
        "hrSize": "11",
        "hrWidth": "50"
    },
    "body": {
        "bodybgColor": "#6de864"
    },
    "main_container": {
        "mainBgColor": "#ab8787",
        "main_h1textColor": "#a14a4a",
        "main_h1bgColor": "#271b1b",
        "paraTextColor": "#ffffff",
        "paraBgColor": "#000000",
        "borderMain": "dashed"
    },
    "links": {
        "A_textColor": "#d25656",
        "A_bgColor": "#2c1616"
    }
}

router.get('/', homeControllers.renderHomePage);

router.get('/check', (req, res) => {
    res.render('home2', data)
});

router.post('/', homeControllers.postHomePageData);

router.put('/', homeControllers.methodNotAllowed);
router.delete('/', homeControllers.methodNotAllowed);
router.patch('/', homeControllers.methodNotAllowed);
router.options('/', homeControllers.methodNotAllowed);

router.all(/^(?!\/$).*/, homeControllers.redirect);

module.exports = router;