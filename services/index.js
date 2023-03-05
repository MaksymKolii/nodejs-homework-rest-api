
const contactModel = require("../shemas/contact");

const listContacts = async () => {
  
  return await contactModel.find({});
};

const getContactById = async (contactId) => {
  return await contactModel.find({ _id: contactId });
};

const addContact = async (body) => {
  return await contactModel.create(body);
};

const updateContact = async (contactId, body) => {

  
  return await contactModel.findByIdAndUpdate({ _id: contactId }, body, {
    new: true,
  });
};

const removeContact = async (contactId) => {
  return await contactModel.findByIdAndDelete({ _id: contactId });
};

const updateStatusContact = async (contactId, body) => {
  return await contactModel.findByIdAndUpdate({ _id: contactId }, body, {
    new: true,
  });
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
  updateStatusContact,
};








