const express = require('express');
const Contacts = require('../../models/contacts')

// const router = new express.Router()

// function validate(contact) {
//   if (!contact) {
//     throw new Error('No contact provided')
//   }
//   if (!contact.name) {
//     throw new Error('name is required')
//   }
//   if (!contact.email) {
//     throw new Error('email is required')
//   }
//   if (!contact.phone) {
//     throw new Error('phone is required')
//   }
//   if (!contact.favorite) {
//     throw new Error('favorite is required')
//   }
// }

// router.get('/', async (req, res, next) => {

//   const result = await Contacts.find({})

//   res.json(result)
// })

// router.get('/search', async (req, res, next) => {
//   const { name, email, phone, favorite } = req.query

//   console.log('name', name)

//   const result = await Contacts.find({ name })

//   res.json(result)
// })

// router.get('/:contactId', async (req, res, next) => {
//   const { contactId } = req.params

//   const result = await Contacts.findById({ _id: contactId })

//   res.json(result)
// })

// router.post('/', async (req, res, next) => {
//   // try {
//   //   validate(req.body)
//   // } catch(e) {
//   //   return next(e)
//   // }

//   const record = await Contacts.insertMany([req.body])

//   res.json(record)
// })

// router.delete('/:contactId', async (req, res, next) => {
//   const { contactId } = req.params

//   const result = await Contacts.deleteOne({ _id: contactId })

//   res.json(result)
// })

// router.put('/:contactId', async (req, res, next) => {
//   const { contactId } = req.params

//   try {
//     validate(req.body)
//   } catch(e) {
//     return next(e)
//   }

//   // console.log('contactId', contactId)
  
//   const record = await Contacts.updateOne({ _id: contactId }, req.body, { new: true })
//   console.log('record', record)

//   res.json(record)
// })

// module.exports = router

const {listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact}=require('../../models/contacts');
const {tryCatchWrapper}=require('../../helpers');


const router = new express.Router();

router.get('/', tryCatchWrapper( listContacts));

router.get('/:contactId', tryCatchWrapper(getContactById));

router.post('/', tryCatchWrapper(addContact));

router.delete('/:contactId', tryCatchWrapper(removeContact));

router.put('/:contactId', tryCatchWrapper(updateContact));

module.exports = router;
