const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
// const config = require("config");

// const items = ;

const app = express();

/////Body parser

app.use(bodyParser.json());

//DB Config
// const db = config.get("mongoURI");

// connect to mongo
require("dotenv").config();
mongoose
  .connect(process.env.mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Mongo DB connected ..."))
  .catch(err => console.log("err"));

//use routes
app.use("/api/items", require("./routes/api/items"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

// set static folder
app.use(express.static("client/build"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

const port = process.env.Port || 4000;

app.listen(port, () => console.log(`server started on port ${port}`));
