const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  console.log(req.body);
  const { name } = req.body;
  if (name) {
    return res.status(200).send(`Welcome <h1>${name}</h1>`);
  }
  res.status(200).send("Please Provide Credentials");
});

module.exports = router