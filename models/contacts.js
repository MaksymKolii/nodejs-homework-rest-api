const {contactsPath} = require('../helpers');
const ContactsFileHandler = require('../contacts');
const file = new ContactsFileHandler(contactsPath);
const validateContacts = require('../middleWares');

const listContacts = async (req, res, next) => {
  const contacts = await file.listContacts();
  res.json({
    status: 'success',
    code: 200,
    contacts,
  });
};


const getContactById = async (req, res, next) => {
  const {contactId} = req.params;
  const contact = await file.getContactById(contactId);
  if (!contact) {
    res.status(404).json({
      status: 'error',
      code: 404,
      message: `Contact with id ${contactId} not found`,
    });
    return;
  }
  res.json({
    status: 'success',
    code: 200,
    contact,
  });
};


const addContact = async (req, res) => {
  const {error} = validateContacts(req.body);

  if (error) {
    const errorsArray = error.details.map((i) => i.message);
    res.status(404).json({
      status: 'error',
      message: errorsArray,
    });
  }

  const newContact = await file.addContact(req.body);
  if (!newContact) {
    res.status(400).json({
      status: 'error',
      message: 'Contact already exist',
    });
  } else {
    res.status(201).json({
      status: 'Successfully created',
      code: 201,

    });
  }
};


const updateContact = async (req, res) => {
  const {error} = validateContacts(req.body);

  if (error) {
    const errorsArray = error.details.map((i) => i.message);
    res.status(404).json({
      status: 'error',
      message: errorsArray,
    });
  }
  const {contactId} = req.params;
  const body = req.body;

  const isEmpty = Object.keys(body);

  if (!isEmpty.length===0) {
    return res.status(404).json({
      status: 'error',
      message: 'missing fields',
    });
  }
  const contact = await file.updateContact(contactId, body);

  if (contact) {
    res.status(200).json({status: 'success', code: 200, contact});
  } else {
    res.status(404).json({
      status: 'error',
      message: 'Not found',
    });
  }
};

const removeContact = async (req, res) => {
  const {contactId} = req.params;
  const contacts = await file.removeContact(contactId);
  if (!contacts) {
    return res.status(404).json({
      status: 'error',
      code: 404,
      message: `Contact with id ${contactId} not found`,
    });
  }
  return res.status(200).json({
    status: 'successfully deleted',
    code: 200,
    message: `Contact with id ${contactId} successfully deleted`,
  });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
