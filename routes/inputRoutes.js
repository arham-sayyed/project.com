const path = require('path');
const express = require('express');
const router = express.Router();

const inputControllers = require(path.join(__dirname, '..' , 'controllers', 'inputControllers'));

router.get('/', inputControllers.renderInputPage);
router.post('/', inputControllers.postInputPageData);


router.put('/', inputControllers.methodNotAllowed);
router.delete('/', inputControllers.methodNotAllowed);
router.patch('/', inputControllers.methodNotAllowed);
router.options('/', inputControllers.methodNotAllowed);

router.all(/^(?!\/$).*/, inputControllers.redirect);


module.exports = router;