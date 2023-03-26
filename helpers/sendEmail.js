const sgMail = require("@sendgrid/mail");

require("dotenv").config();

const { SENDGRID_TOKEN } = process.env;

sgMail.setApiKey(SENDGRID_TOKEN);

const sendEmail = async (data) => {
  const email = { ...data, from: "rukus015@gmail.com" };
  await sgMail.send(email);
  return true;
};

module.exports = sendEmail;