const fs = require("fs");
const path = require("path");
const views = path.join(__dirname + "/../views");

const newOnSalePath = path.join(__dirname, "../models/newOnSale.json");
const products = JSON.parse(fs.readFileSync(newOnSalePath, "utf-8"));
const bannerPath = path.join(__dirname, "../models/banner.json");
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
	error404: (req, res) => {
		res.render("Página no encontrada");
	},
};

module.exports = mainController;
