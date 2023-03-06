require("dotenv").config();

const authRouter = require("./routes/auth");
const contactsRouter = require("./routes/contacts");
const getConnection = require("./db/connection");
const usersRouter = require("./routes/users");

const app = require("./app");
const { PORT } = process.env;

require('./config/config-passport')

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/contacts", contactsRouter);


app.listen(PORT, async () => {
  await getConnection();
  console.log("Database connection successful. Use our API on port:" + PORT);
});


