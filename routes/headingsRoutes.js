const path = require('path');
const express = require('express');
const router = express.Router();

const headingsControllers = require(path.join(__dirname, '..' , 'controllers', 'headingsControllers'));

router.get('/', headingsControllers.renderHeadingsPage);
router.post('/', headingsControllers.postHeadingsPageData);


router.put('/', headingsControllers.methodNotAllowed);
router.delete('/', headingsControllers.methodNotAllowed);
router.patch('/', headingsControllers.methodNotAllowed);
router.options('/', headingsControllers.methodNotAllowed);

router.all(/^(?!\/$).*/, headingsControllers.redirect);


module.exports = router;