const express = require('express');
const router = new express.Router();

const ContactsController = require('../controllers/ContactsController')




router.get('/', ContactsController.getAllCont);

router.get('/:contactId', ContactsController.getContById);

router.post('/', ContactsController.createCont);

router.delete('/:contactId', ContactsController.removeCont);

router.put('/:contactId', ContactsController.updateCont);

router.patch("/:contactId/favorite", ContactsController.updateStatusCont);

module.exports = router;

