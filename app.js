const express = require("express");
const logger = require("./Logger");
const authorized = require("./authorized");
const morgan = require("morgan");
const people = require("./routes/people");
const auth = require("./routes/auth");
const app = express();

app.use(express.static("./methods-public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api/people",people )
app.use("/login", auth);






app.listen(5000, () => {
  console.log("====================================");
  console.log("port 5000 is active");
  console.log("====================================");
});
