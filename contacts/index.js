const fs = require("fs/promises");
const { v4: uuidv4 } = require("uuid");
const { contactsPath } = require("../helpers");

class ContactsFileHandler {
  constructor(contactsPath) {
    this.contactsPath = contactsPath;
  }

  async listContacts() {
    const data = await fs.readFile(contactsPath, "utf8");
    const normalizeData = JSON.parse(data);
    return normalizeData;
  }

  async display() {
    console.table(await this.listContacts());
  }

  async create(data) {
    await fs.writeFile(this.contactsPath, JSON.stringify(data, null, 2));
  }


  async getContactById(contactId) {
    const stringContactId = String(contactId);
    const arr = await this.listContacts();
    const value = arr.filter(({ id }) => id === stringContactId);

    if (!value) {
      return null;
    }
    return value;
  }

  async removeContact(contactId) {
    const normalizeData = await this.listContacts();
    const stringContactId = String(contactId);

    if (!normalizeData.some(({ id }) => id === stringContactId)) {
      console.log(`Contact with id: ${contactId} not exist`);
      return null;
    }
    const value = normalizeData.filter(({ id }) => id !== stringContactId);

    await this.create(value);
    return value;
  }


  async addContact(data) {
    const newContact = { id: uuidv4().slice(0, 8), ...data };
    const { name, email, phone } = data;

    const contacts = await this.listContacts();

    const checkName = () => {
      if (
        contacts.find(
          (value) => value.name?.toLowerCase() === name.toLowerCase()
        )
      ) {
        console.log(`Contact with name: ${name} already exist`);
        return true;
      }
    };
    console.log("checkName", checkName());

    const checkEmail = () => {
      if (
        contacts.find(
          (value) => value.email?.toLowerCase() === email.toLowerCase()
        )
      ) {
        console.log(`Contact with email: ${email} already exist`);
        return true;
      }
    };
    console.log("checkEmail", checkEmail());

    const checkPhone = () => {
      if (contacts.find((value) => value.phone === phone)) {
        console.log(`Contact with phone: ${phone} already exist`);
        return true;
      }
    };
    console.log("checkPhone", checkPhone());

    if (checkName() || checkEmail() || checkPhone()) {
      return null;
    }

    const newArray = [...contacts, newContact];
    await this.create(newArray);
    return newContact;
  }

  async updateContact(contactId, data) {
    const contacts = await this.listContacts();
    const stringContactId = String(contactId);

    const index = contacts.findIndex(({ id }) => id === stringContactId);

    if (index === -1) {
      return null;
    }

    contacts[index] = { ...contacts[index], ...data };

    await this.create(contacts);

    return contacts[index];
  }
}

module.exports = ContactsFileHandler;
