const jwt = require("jsonwebtoken");
require("dotenv").config();

const { SECRET_KEY } = process.env;

const generateToken = ({ _id: id, email, subscription }) => {
    const payload = {
        id,
        email,
        subscription,
    };
    console.log("Отработал generateToken", SECRET_KEY);
    return jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
};

module.exports = generateToken;
