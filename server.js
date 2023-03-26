const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();


// const sgMail = require('@sendgrid/mail');
// // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// sgMail.setApiKey(process.env.SENDGRID_TOKEN);

// const msg = {
//   to: 'maksymkolii@gmail.com',
//   from: 'rukus015@gmail.com',
//   subject: 'Sending with SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// };

// sgMail
//   .send(msg)
//   .then(() => {
//     console.log('Email sent');
//   })
//   .catch(error => {
//     console.error(error);
//   });


const { DB_HOST, PORT } = process.env;

mongoose
    .connect(DB_HOST)
    .then(() => {
        console.log("\x1B[32m Database connection successful");

        app.listen(PORT, () => {
            console.log(
                `\x1B[32m Server running. Use our API on port: \x1B[37m http://localhost:${PORT}`
            );
        });
    })
    .catch(() => {
        console.log("\x1B[31mDatabase connection failed");
        process.exit(1);
    });
