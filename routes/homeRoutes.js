const path = require('path');
const express = require('express');
const router = express.Router();

const homeControllers = require(path.join(__dirname, '..' , 'controllers', 'homeControllers'));

router.get('/', homeControllers.renderHomePage);

// router.get('/check', (req, res) => {
//     res.render('home2', data)
// });

router.post('/', homeControllers.postHomePageData);

router.put('/', homeControllers.methodNotAllowed);
router.delete('/', homeControllers.methodNotAllowed);
router.patch('/', homeControllers.methodNotAllowed);
router.options('/', homeControllers.methodNotAllowed);

router.all(/^(?!\/$).*/, homeControllers.redirect);

module.exports = router;