const fs = require("fs");
const path = require("path");
const { title } = require("process");
const views = path.join(__dirname + "/../views");
const { validationResult }  = require('express-validator')

const productPath = path.join(__dirname + "/../data/newOnSale.json");
const product = JSON.parse(fs.readFileSync(productPath, "utf-8"));

const productController = {
  details: (req, res) => {
    let id = req.params.id;
    // console.log(id);
    let produc = product.find((product) => product.id == id);
    res.render(views + "/products/productDetail.ejs", {
      css: "ProDeta",
      title: "Detalles del Producto - DHaunters",
      produc,
    });
  },
  store: (req, res) => {
    let products = product;
    res.render(views + "/products/marketplace.ejs", {
      css: "Home",
      title: "Store - DHaunters",
      products,
    });
  },

  edit: (req, res) => {
    let id = req.params.id;
    let producto = product.find((produccto) => produccto.id == id);
    res.render(views + "/products/editProduct.ejs", {
      producto,
      css: "CreateProduct",
      title: "Edicion del producto",
      producto,
    });
  },

  update: (req, res) => {
    let id = req.params.id;
    let producToEdit = product.find((produccto) => produccto.id == id);

    let img = producToEdit.img;
    if (req.file) {
      let pathToUpdate = path.join(
        __dirname,
        "/../../public/img/products" + img
      );
      fs.unlinkSync(pathToUpdate);
      img = req.file.filename;
    }
    producToEdit = {
      id: id,
      ...req.body,
      img,
    };

    let updatedProducts = product.map((p) => {
      if (p.id == producToEdit.id) {
        return (p = { ...producToEdit });
      }
      return p;
    });

    fs.writeFileSync(productPath, JSON.stringify(updatedProducts), "utf-8");
    res.redirect("/");
  },

  delete: (req, res) => {
    let id = req.params.id;
    let finalDelete = product.filter((p) => p.id != id);

    let productToDelete = product.filter((p) => p.id == id);

    let pathToDelete = path.join(
      __dirname,
      "/../../public/img/products/" + productToDelete[0].img
    );

    fs.unlinkSync(pathToDelete);

    fs.writeFileSync(productPath, JSON.stringify(finalDelete), "utf-8");
    res.redirect("/");
  },

  createProduct: (req, res) => {
    res.render(views + "/products/createProduct.ejs", {
      css: "CreateProduct",
      title: "Formulario de creacion de producto",
    });
  },

  create: (req, res) => {
    let errors = validationResult(req);

    if (errors.isEmpty()) {
      let id = product[product.length - 1].id + 1;
      let { name, price, shortDesc, LongDesc, category, universe } = req.body;

      let img = "";
      if (req.file) {
        img = req.file.filename;
      }

      let newProduct = {
        id,
        ...req.body,
        img,
      };

      product.push(newProduct);
      fs.writeFileSync(productPath, JSON.stringify(product), "utf-8");

      res.redirect("/store");
    }
    {
      res.render(views + "/products/createProduct.ejs", {
        css: "CreateProduct",
        title: "Formulario de creacion de producto",
        errors: errors.mapped(),
        oldDate: req.body,
      });
    }
  } 
};

module.exports = productController;
