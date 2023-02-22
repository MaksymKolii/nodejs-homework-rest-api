const app = require('./app')
 require("./contacts")
// const ContactsFileHandler= require("./contacts")



// const path = require("path");
// const contactsPath = path.join(__dirname,  "db", "contacts.json");


app.listen(3030, () => {
  console.log("Server running. Use our API on port: 3030")
})

// const file = new ContactsFileHandler(contactsPath);
// file.display()
// const data = {
//   name: "Ko97bb8olb",
//   email: "m@88is.net",
//   phone: "(542) 4700977",
// };
// asyncHandler(file.removeContact("441baded"))
  // asyncHandler(file.addContact(data))
  // file.addContact(data)
// asyncHandler(file.updateContact("7651da59",data))
//  file.removeContact("924c8d71")
// asyncHandler(file.getContactById(3))
//  file.create(data)
// file.display();
