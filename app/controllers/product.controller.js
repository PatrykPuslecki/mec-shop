const db = require("../models");

const Product = db.products;

exports.create = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({ message: "Product can not be empty!" });
    return;
  }
  const product = new Product({
    productId: req.body.productId,
    name: req.body.name,
    price: req.body.price,
    stock: req.body.stock,
  });

  product
    .save(product)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error occured while creating product",
      });
    });
};

exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name
    ? { name: { $regex: new RegExp(name), $options: "i" } }
    : {};

  Product.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving products.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.query.productId;

  Product.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Product with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Product with id=" + id });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.param.productId;

  Product.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Proudct with id=${Id}. Maybe Product was not found!`,
        });
      } else res.send({ message: "Product was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Product with id=" + id,
      });
    });
};
