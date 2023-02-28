const { Contacts } = require("../db/schema");

const listContacts = async () => {
  return await Contacts.find({});
};

const getContactById = async (contactId) => {
  return await Contacts.find({ _id: contactId });
};

const addContact = async (body) => {
  return await Contacts.create(body);
};

const updateContact = async (contactId, body) => {
  return await Contacts.findByIdAndUpdate({ _id: contactId }, body, {
    new: true,
  });
};

const removeContact = async (contactId) => {
  return await Contacts.findByIdAndDelete({ _id: contactId });
};

const updateStatusContact = async (contactId, body) => {
  return await Contacts.findByIdAndUpdate({ _id: contactId }, body, {
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

// const { Contacts } = require("../db/schema");

// class ContactsHandler {
//   constructor(Contacts) {
//     this.Contacts = Contacts;
//   }
//   async listContacts () {
//     return await Contacts.find({});
//   };
  
//   async getContactById (contactId) {
//     return await Contacts.findOne({ _id: contactId });
//   };
  
//   async addContact  (body)  {
//     return await Contacts.create(body);
//   };
  
//   async updateContact  (contactId, body)  {
//     return await Contacts.findByIdAndUpdate({ _id: contactId }, body, {
//       new: true,
//     });
//   };
  
//   async removeContact  (contactId)  {
//     return await Contacts.findByIdAndDelete({ _id: contactId });
//   };
  
//   async updateStatusContact  (contactId, body) {
//     return await Contacts.findByIdAndUpdate({ _id: contactId }, body, {
//       new: true,
//     });

// }}

// module.exports = ContactsHandler;
