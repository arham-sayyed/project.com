const path = require('path');
const express = require('express');
const router = express.Router();

const listsControllers = require(path.join(__dirname, '..' , 'controllers', 'listsControllers'));

router.get('/', listsControllers.renderListsPage);
router.post('/', listsControllers.postListsPageData);


router.put('/', listsControllers.methodNotAllowed);
router.delete('/', listsControllers.methodNotAllowed);
router.patch('/', listsControllers.methodNotAllowed);
router.options('/', listsControllers.methodNotAllowed);

router.all(/^(?!\/$).*/, listsControllers.redirect);


module.exports = router;