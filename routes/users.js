const express = require('express');
const router = new express.Router();

const UsersController = require('../controllers/UsersController')




router.get('/', UsersController.get);

router.get('/:contactId', UsersController.getById);

router.post('/', UsersController.create);

router.delete('/:contactId', UsersController.remove);

router.put('/:contactId', UsersController.update);
module.exports = router;