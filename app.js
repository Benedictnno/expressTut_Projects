const express = require("express");
const logger = require("./Logger");
const authorized = require("./authorized");
const morgan = require("morgan");
let { people } = require("./data");
const app = express();

app.use(express.static("./methods-public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.get("/api/people", (req, res) => {
  res.status(200).json({ success: true, data: people });
});

app.post("/api/people", (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: "please Provide name value" });
  }
  res.status(201).json({ success: true, person: name });
});

app.post("/login", (req, res) => {
  console.log(req.body);
  const { name } = req.body;
  if (name) {
    return res.status(200).send(`Welcome <h1>${name}</h1>`);
  }
  res.status(200).send("Please Provide Credentials");
});

app.put("/api/people/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const Person = people.find((persons) => persons.id === Number(id));

  if (!Person) {
    return res
      .status(400)
      .json({ success: false, msg: "please Provide a valid id value" });
  }

  const newPeople = people.map((persons) => {
    if (persons.id === Number(id)) {
      persons.name = name;
    }
    return persons;
  });

  res.status(200).json({ newPeople });
});
app.delete("/api/people/:id", (req, res) => {
  const { id } = req.params;
  const Person = people.find((persons) => persons.id === Number(id));

  if (!Person) {
    return res
      .status(400)
      .json({ success: false, msg: "please Provide a valid id value" });
  }

  const newPeople = people.filter((persons) => persons.id !== Number(id));

  res.status(200).json({ newPeople });
});

app.listen(5000, () => {
  console.log("====================================");
  console.log("port 5000 is active");
  console.log("====================================");
});
