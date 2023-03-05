const mongoose = require("mongoose");
const { getConnectionURI } = require("./utils");

const getConnection = async () => {
  mongoose.set("strictQuery", false);
  return mongoose.connect(getConnectionURI(), {
    promiseLibrary: global.Promise,
    useUnifiedTopology: true,
  });
};

module.exports = getConnection;
