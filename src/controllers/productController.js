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
    let producToEdit = product.filter((producto) => producto.id == id);
    let producToUpdeat = product.filter((producto) => producto.id == id);

    let img = "";
    if (req.file) {
      let pathToUpdeat = path.join(
        __dirname,
        "../../public/img/" + productToDelete.img
      );
      fs.unlinkSync(pathToUpdeat);
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
      "../../public/img/" + productToDelete.img
    );
    fs.unlinkSync(pathToDelete);

    fs.writeFileSync(productPath, JSON.stringify(finalDelete), "utf-8");
    res.render("/");
  },

  createProduct: (req, res) => {
    res.render(views + "/products/createProduct.ejs", {
      css: "CreateProduct",
      title: "Formulario de creacion de producto",
    });
  },

  create: (req, res) => {
    let id = product[product.lenght - 1].id + 1;
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

    res.redirect("marketplace");
  },
};

module.exports = productController;
