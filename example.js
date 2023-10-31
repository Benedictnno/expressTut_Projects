const express = require("express");
const path = require("path");
const app = express();
const { products, people } = require("./data");
// app.use(express.static('./public'))

app.get("/", (req, res) => {
  res.send('<h1> Home Page </h1><a href="/api/products><h1>products </h1></a>');
});

app.get("/api/products", (req, res) => {
  const newProducts = products.map(({ id, name, image }) => {
    return { id, name, image };
  });
  res.json(newProducts);
});

//  query the data base to get specific products

app.get("/api/v1/query", (req, res) => {
  console.log("====================================");
  console.log(req.query);
  console.log("====================================");
  const { search, limit } = req.query;
  let sortedProducts = [...products];
  if (search) {
    sortedProducts = sortedProducts.filter((product) => {
      return product.name.includes(search);
    });
  }

  if (limit) {
    return (sortedProducts = sortedProducts.slice(0, Number(limit)));
  }

  if (sortedProducts.length < 1) {
    // res.status(200).send("No Products matched Your description");
    return res.status(400).json({ success: true, data: [] });
  }
  return res.status(200).json(sortedProducts);
});

app.get("/api/products/:ID", (req, res) => {
  const singleProduct = products.find(
    (product) => product.id === Number(req.params.ID)
  );

  const status = !singleProduct
    ? res.status(404).send("product not found")
    : res.json(singleProduct);
  return status;
});

app.all("*", (req, res) => {
  res.status(404).send("<h1>Resource not found</h1> ");
});

app.listen(5000, () => {
  console.log("====================================");
  console.log("port 5000 is active");
  console.log("====================================");
});
