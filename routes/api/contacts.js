const express = require('express')
const { listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact}=require("../../models/contacts")
  const {tryCatchWrapper }=require("../../helpers")


const router = express.Router()

router.get('/', tryCatchWrapper( listContacts))

router.get('/:contactId', tryCatchWrapper(getContactById))

router.post('/', tryCatchWrapper(addContact))

router.delete('/:contactId', tryCatchWrapper(removeContact))

router.put('/:contactId', tryCatchWrapper(updateContact))

module.exports = router
