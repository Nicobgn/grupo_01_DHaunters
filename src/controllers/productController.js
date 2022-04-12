const fs = require("fs");
const path = require("path");
const { title } = require("process");
const views = path.join(__dirname + "/../views");

const productPath = path.join(__dirname + "/../models/newOnSale.json");
const product = JSON.parse(fs.readFileSync(productPath, "utf-8"));

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
