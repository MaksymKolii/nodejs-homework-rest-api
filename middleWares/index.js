const validation = require("./validation");
const ctrlWrapper = require("./ctrlWrapper");
const isValidId = require("./isValidId");
const authenticate = require("./authenticate");
const checkUniqData = require("./checkUniqData");
const upload = require('./upload')

module.exports = { validation, ctrlWrapper, isValidId, authenticate, checkUniqData, upload };
