let { people } = require("../data");

const getPeople = (req, res) => {
  res.status(200).json({ success: true, data: people });
};

const createPerson = (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: "please Provide name value" });
  }
  res.status(201).json({ success: true, person: name });
};

const updatePerson = (req, res) => {
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
};

const deletePerson = (req, res) => {
  const { id } = req.params;
  const Person = people.find((persons) => persons.id === Number(id));

  if (!Person) {
    return res
      .status(400)
      .json({ success: false, msg: "please Provide a valid id value" });
  }

  const newPeople = people.filter((persons) => persons.id !== Number(id));

  res.status(200).json({ newPeople });
};

module.exports = { getPeople, deletePerson, createPerson, updatePerson };
