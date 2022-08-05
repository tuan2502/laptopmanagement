const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "tuan2502",
  database: "latopmanagement",
});

app.post("/createproduct", (req, res) => {
  const productName = req.body.productName;
  const productImg = req.body.productImg;
  const quantity = req.body.quantity;
  const price = req.body.price;
  const categoryId = req.body.categoryId;

  db.query(
    "INSERT INTO products (productName, productImg, quantity, price, categoryId) VALUES (?,?,?,?,?)",
    [productName, productImg, quantity, price, categoryId],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.get("/products", (req, res) => {
  db.query("SELECT * FROM products", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/updateproduct", (req, res) => {
  const id = req.body.id;
  const productName = req.body.productName;
  const productImg = req.body.productImg;
  const quantity = req.body.quantity;
  const price = req.body.price;
  const categoryId = req.body.categoryId;
  db.query(
    "UPDATE products SET productName = ?,  productImg = ?, quantity = ?, price = ?, categoryId = ? WHERE id = ?",
    [productName, productImg, quantity, price, categoryId, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/deleteproduct/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM products WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/categories", (req, res) => {
  db.query("SELECT * FROM categories", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("running on port 3001");
});
