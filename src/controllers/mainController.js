const path = require("path");
const views = path.join(__dirname + "/../views");
const testData = require("../models/data");

const mainController = {
	home: (req, res) => {
		res.render(views + "/home.ejs", {
			css: "Home",
			title: "Bienvenido a DHaunters",
		});
	},
};

module.exports = mainController;
