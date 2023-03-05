const service = require("../services");
const validateContacts = require('../middleWares')

const asyncHandler = require("express-async-handler");


class ContactsController {
  createCont = asyncHandler(async (req, res) => {
    const { error, value } = validateContacts.addContactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const { name, email, phone, favorite } = value;
    if (!name || !email || !phone) {
      res.status(400);
      throw new Error("Provide all required fields !");
    }
    const contact = await service.addContact(value);
    res.status(201).json({
      code: 201,
      message: "Success !!!! HurrAAA!!",
      data: contact,
    });
  });

  getAllCont = asyncHandler(async (req, res) => {
    const results = await service.listContacts();
    res.json(results);
  });

  getContById = asyncHandler(async (req, res) => {
    const { contactId: id } = req.params;
    const contact = await service.getContactById(id);
    if (contact.length === 0) {
      res.status(404).json({ message: "Not found" });
      return;
    }
    res.json(contact);

  });

  
  removeCont = asyncHandler(async (req, res) => {
    const { contactId: id } = req.params;
    const contacts = await service.listContacts();
    if (contacts.every((c) => c.id !== id)) {
      return res.status(404).json({ message: "Not found" });
    }
    const newContacts = await service.removeContact(id);
    res.json({
      message: `Contact with ID:${newContacts.id} name:${newContacts.name} deleted!`,
    });
  });
 

  updateCont = asyncHandler(async (req, res) => {

    const { contactId: id } = req.params;
    const { error } = validateContacts.updateContactSchema.validate(req.body);
  
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        message: "missing fields",
      });
    }
  
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
  
    const newData = await service.updateContact(id, req.body);
    if (!newData) {
      return res.status(404).json({
        message: "Not found",
      });
    }
    return res.status(200).json(newData);

  });


  updateStatusCont = asyncHandler(async (req, res) => {
    // const { error } = validateContacts.updateStatusCont.validate(req.body);

    // if (error) {
    //   return res.status(400).json({ message: error.details[0].message });
    // }
    // const contacts = await service.listContacts();
    // if (contacts.every(({ id }) => id !== req.params.contactId)) {
    //   return res.status(404).json({ message: "Not found" });
    // }
    // const data = await service.updateContact(req.params.contactId, req.body);
    // return res.json(data);


    const { contactId: id } = req.params;
    const { error } = validateContacts.updateContactSchema.validate(req.body);
  
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        message: "missing fields",
      });
    }
  
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
  
    const newData = await service.updateStatusContact(id, req.body);
    if (!newData) {
      return res.status(404).json({
        message: "Not found",
      });
    }
    return res.status(200).json(newData);
  }
  
  );
}
module.exports = new ContactsController();
