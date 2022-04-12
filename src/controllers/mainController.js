const fs = require("fs");
const path = require("path");

const views = path.join(__dirname + "/../views");
const productsPath = path.join(__dirname, "../models/products.json");
const bannerPath = path.join(__dirname, "../models/banner.json");

const products = JSON.parse(fs.readFileSync(productsPath, "utf-8"));
const banner = JSON.parse(fs.readFileSync(bannerPath, "utf-8"));

const mainController = {
	home: (req, res) => {
		res.render(views + "/home.ejs", {
			css: "Home",
			title: "Bienvenido a DHaunters",
			banner,
			products,
		});
	},
};

module.exports = mainController;
