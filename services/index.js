const { Contacts } = require("../db/schema");

class ContactsHandler {
  constructor(Contacts) {
    this.Contacts = Contacts;
  }
  async listContacts () {
    return await Contacts.find({});
  };
  
  async getContactById (contactId) {
    return await Contacts.find({ _id: contactId });
  };
  
  async addContact  (body)  {
    return await Contacts.create(body);
  };
  
  async updateContact  (contactId, body)  {
    return await Contacts.findByIdAndUpdate({ _id: contactId }, body, {
      new: true,
    });
  };
  
  async removeContact  (contactId)  {
    return await Contacts.findByIdAndDelete({ _id: contactId });
  };
  
  async updateStatusContact  (contactId, body) {
    return await Contacts.findByIdAndUpdate({ _id: contactId }, body, {
      new: true,
    });

}}

module.exports = ContactsHandler;
