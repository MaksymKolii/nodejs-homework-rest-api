const mongoose = require("mongoose");
// const { DB_PROTOCOL, DB_USER, DB_PASS, DB_HOST, M_URL } = process.env;
const { getConnectionURI } = require("./utils");

const getConnection = async () => {
  mongoose.set("strictQuery", false);
  mongoose.connect(getConnectionURI(), {
    promiseLibrary: global.Promise,
    useUnifiedTopology: true,
  });
};

module.exports = {getConnection};
