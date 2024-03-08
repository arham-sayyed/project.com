const path = require('path');
const express = require('express');
const router = express.Router();

const formattingControllers = require(path.join(__dirname, '..' , 'controllers', 'formattingControllers'));

router.get('/', formattingControllers.renderFormattingPage);
router.post('/', formattingControllers.postFormattingPageData);


router.put('/', formattingControllers.methodNotAllowed);
router.delete('/', formattingControllers.methodNotAllowed);
router.patch('/', formattingControllers.methodNotAllowed);
router.options('/', formattingControllers.methodNotAllowed);

router.all(/^(?!\/$).*/, formattingControllers.redirect);


module.exports = router;