const path = require("path");
const { title } = require("process");
const views = path.join(__dirname + "/../views");
const testData = require("../models/data");

const productController = {
  details: (req, res) => {
    res.render(views + "/products/productDetail.ejs", {
      css: "ProDeta",
      title: "Detalles del Producto - DHaunters",
    });
  },
  store: (req, res) => {
    res.render(views + "/products/marketplace.ejs", {
      css: "",
      title: "Store - DHaunters",
    });
  },
  createProduct: (req, res) => {
    res.render(views + "/products/createProduct.ejs", {
      css: "CreateProduct",
      title: "Formulario de creacion de producto",
    });
  },
};

module.exports = productController;
