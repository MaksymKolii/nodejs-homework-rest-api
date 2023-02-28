require("dotenv").config();
const { getConnection } = require("./db/mongoose");
const app = require("./app");

// // const Contacts=require("./models/contacts")

getConnection()
  .then(
    app.listen(3030, () => {
      console.log("Database connection successful. Use our API on port: 3030");
    })
  )
  .catch((error) => {
    console.log(`Server not running. Error message: ${error.message}`);
    process.exit(1);
  });
