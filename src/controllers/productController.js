const fs = require("fs");
const path = require("path");

const views = path.join(__dirname + "/../views");
const productsPath = path.join(__dirname, "../models/products.json");

const products = JSON.parse(fs.readFileSync(productsPath, "utf-8"));

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
};

module.exports = productController;
