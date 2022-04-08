const path = require("path");
const views = path.join(__dirname + "/../views");
const testData = require("../models/data");

const productController = {
	details: (req, res) => {
		res.render(views + "/products/productDetail.ejs", {
			css: "ProDelta",
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
