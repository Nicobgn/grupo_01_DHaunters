const path = require("path");
const views = path.join(__dirname + "/../views");
const testData = require("../models/data");

const productController = {
<<<<<<< HEAD
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
=======
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
>>>>>>> cab6865fc2e6f3c2bab91fa6fd16a23171494410
};

module.exports = productController;
