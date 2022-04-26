const fs = require("fs");
const path = require("path");
const { title } = require("process");
const views = path.join(__dirname + "/../views");

const productPath = path.join(__dirname + "/../data/newOnSale.json");
const product = JSON.parse(fs.readFileSync(productPath, "utf-8"));

const productController = {
  details: (req, res) => {
    let id = req.params.id;
    console.log(id);
    let produc = product.find((product) => product.id == id);
    res.render(views + "/products/productDetail.ejs", {
      css: "ProDeta",
      title: "Detalles del Producto - DHaunters",
      produc,
    });
  },
  store: (req, res) => {
    res.render(views + "/products/marketplace.ejs", {
      css: "Home",
      title: "Store - DHaunters",
      product,
    });
  },

  edit: (req, res) => {
    let id = req.params.id;
    let producto = product.find((produccto) => produccto.id == id);
    res.render(views + "/products/editProduct.ejs", {
      producto,
      css: "Home",
      title: "Edicion del producto",
      producto,
    });
  },

  updeat: (req, res) => {
    let id = req.params.id;
    let produc = product.filter((producto) => producto.id != id);
    let productoEditado = {
      id: id,
      ...req.body,
    };

    produc.push(productoEditado);
    fs.writeFileSync(productPath, JSON.stringify(produc));
    res.redirect("/");
  },

  delete: () => {},

  createProduct: (req, res) => {
    res.render(views + "/products/createProduct.ejs", {
      css: "CreateProduct",
      title: "Formulario de creacion de producto",
    });
  },
};

module.exports = productController;
