const fs = require("fs");
const path = require("path");

const views = path.join(__dirname + "/../views");
const productsPath = path.join(__dirname, "../models/products.json");

const products = JSON.parse(fs.readFileSync(productsPath, "utf-8"));

const userController = {
	login: (req, res) => {
		res.render(views + "/users/log-in.ejs", {
			css: "Forms",
			title: "Inicia tu Sesión - DHaunters",
		});
	},
	register: (req, res) => {
		res.render(views + "/users/sign-up.ejs", {
			css: "Forms",
			title: "Registrate - DHaunters",
		});
	},
	cart: (req, res) => {
		let productLength = product.length;

		res.render(views + "/users/cart.ejs", {
			css: "Cart",
			title: "Carrito - DHaunters",
			product: product,
			lenght: productLength,
		});
	},
	collection: (req, res) => {
		res.render(views + "/users/myCollection.ejs", {
			css: "",
			title: "Mi Colección - DHaunters",
		});
	},
	favourites: (req, res) => {
		res.render(views + "/users/myFavourites.ejs", {
			css: "",
			title: "Mis Favoritos - DHaunters",
		});
	},
};

module.exports = userController;
