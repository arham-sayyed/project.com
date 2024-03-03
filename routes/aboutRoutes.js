const path = require('path');
const express = require('express');
const router = express.Router();

const aboutControllers = require(path.join(__dirname, '..' , 'controllers', 'aboutControllers'));

router.get('/', aboutControllers.renderAboutPage);

router.post('/', aboutControllers.postAboutPageData);

router.put('/', aboutControllers.methodNotAllowed);
router.delete('/', aboutControllers.methodNotAllowed);
router.patch('/', aboutControllers.methodNotAllowed);
router.options('/', aboutControllers.methodNotAllowed);

router.all(/^(?!\/$).*/, aboutControllers.redirect);


module.exports = router;