
// const { Contacts } = require("../db/schema");

// const ContactsHandler = require('../services/index');
// const file = new ContactsHandler(Contacts);
// const validateContacts = require('../middleWares');

// const listContacts = async (req, res, next) => {
//   const contacts = await file.listContacts(Contacts);
//   console.log('Contacts', contacts);
//   res.json({
//     status: "success",
//     code: 200,
//     contacts,
//   });
// };


// const getContactById = async (req, res, next) => {
//   const {contactId} = req.params;
//   const contact = await file.getContactById(contactId);
//   if (!contact) {
//     res.status(404).json({
//       status: 'error',
//       code: 404,
//       message: `Contact with id ${contactId} not found`,
//     });
//     return;
//   }
//   res.json({
//     status: 'success',
//     code: 200,
//     contact,
//   });
// };



// const addContact = async (req, res) => {
//   const {error} = validateContacts(req.body);

//   if (error) {
//     const errorsArray = error.details.map((i) => i.message);
//     res.status(404).json({
//       status: 'error',
//       message: errorsArray,
//     });
//   }

//   const newContact = await file.addContact(req.body);
//   if (!newContact) {
//     res.status(400).json({
//       status: 'error',
//       message: 'Contact already exist',
//     });
//   } else {
//     res.status(201).json({
//       status: 'Successfully created',
//       code: 201,

//     });
//   }
// };



// const updateContact = async (req, res) => {
//   const {error} = validateContacts(req.body);

//   if (error) {
//     const errorsArray = error.details.map((i) => i.message);
//     res.status(404).json({
//       status: 'error',
//       message: errorsArray,
//     });
//   }
//   const {contactId} = req.params;
//   const body = req.body;

//   const isEmpty = Object.keys(body);

//   if (!isEmpty.length===0) {
//     return res.status(404).json({
//       status: 'error',
//       message: 'missing fields',
//     });
//   }
//   const contact = await file.updateContact(contactId, body);

//   if (contact) {
//     res.status(200).json({status: 'success', code: 200, contact});
//   } else {
//     res.status(404).json({
//       status: 'error',
//       message: 'Not found',
//     });
//   }
// };

// const removeContact = async (req, res) => {
//   const {contactId} = req.params;
//   const contacts = await file.removeContact(contactId);
//   if (!contacts) {
//     return res.status(404).json({
//       status: 'error',
//       code: 404,
//       message: `Contact with id ${contactId} not found`,
//     });
//   }
//   return res.status(200).json({
//     status: 'successfully deleted',
//     code: 200,
//     message: `Contact with id ${contactId} successfully deleted`,
//   });
// };

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// };


// //!============================================================
// const service = require('../service')

// const get = async (req, res, next) => {
//   try {
//     const results = await service.getAlltasks()
//     res.json({
//       status: 'success',
//       code: 200,
//       data: {
//         tasks: results,
//       },
//     }) 
//   } catch (e) {
//     console.error(e)
//     next(e)
//   }
// }

// const getById = async (req, res, next) => {
//   const { id } = req.params
//   try {
//     const result = await service.getTaskById(id)
//     if (result) {
//       res.json({
//         status: 'success',
//         code: 200,
//         data: { task: result },
//       })
//     } else {
//       res.status(404).json({
//         status: 'error',
//         code: 404,
//         message: `Not found task id: ${id}`,
//         data: 'Not Found',
//       })
//     }
//   } catch (e) {
//     console.error(e)
//     next(e)
//   }
// }

// const create = async (req, res, next) => {
//   const { title, text } = req.body
//   try {
//     const result = await service.createTask({ title, text })

//     res.status(201).json({
//       status: 'success',
//       code: 201,
//       data: { task: result },
//     })
//   } catch (e) {
//     console.error(e)
//     next(e)
//   }
// }

// const update = async (req, res, next) => {
//   const { id } = req.params
//   const { title, text } = req.body
//   try {
//     const result = await service.updateTask(id, { title, text })
//     if (result) {
//       res.json({
//         status: 'success',
//         code: 200,
//         data: { task: result },
//       })
//     } else {
//       res.status(404).json({
//         status: 'error',
//         code: 404,
//         message: `Not found task id: ${id}`,
//         data: 'Not Found',
//       })
//     }
//   } catch (e) {
//     console.error(e)
//     next(e)
//   }
// }

// const updateStatus = async (req, res, next) => {
//   const { id } = req.params
//   const { isDone = false } = req.body

//   try {
//     const result = await service.updateTask(id, { isDone })
//     if (result) {
//       res.json({
//         status: 'success',
//         code: 200,
//         data: { task: result },
//       })
//     } else {
//       res.status(404).json({
//         status: 'error',
//         code: 404,
//         message: `Not found task id: ${id}`,
//         data: 'Not Found',
//       })
//     }
//   } catch (e) {
//     console.error(e)
//     next(e)
//   }
// }

// const remove = async (req, res, next) => {
//   const { id } = req.params

//   try {
//     const result = await service.removeTask(id)
//     if (result) {
//       res.json({
//         status: 'success',
//         code: 200,
//         data: { task: result },
//       })
//     } else {
//       res.status(404).json({
//         status: 'error',
//         code: 404,
//         message: `Not found task id: ${id}`,
//         data: 'Not Found',
//       })
//     }
//   } catch (e) {
//     console.error(e)
//     next(e)
//   }
// }

// module.exports = {
//   get,
//   getById,
//   create,
//   update,
//   updateStatus,
//   remove,
// }
