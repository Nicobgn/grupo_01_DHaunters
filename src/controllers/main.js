// Requiring Libraries
const db = require("../database/models");

// Placing abbreviations of Models
const Product = db.Product;
const User = db.User;
const Banner = db.Banner;

const mainController = {
  home: async (req, res) => {
    let scripts = [
      "misc/carouselBanner",
      "misc/navbarToggle",
      "util/cartManager",
    ];
    let banners = await Banner.findAll({
      where: {
        deleted: 0,
      },
    });
    let products = await Product.findAll({
      where: {
        deleted: 0,
      },
    });
    res.render("home.ejs", {
      css: "stylesHome",
      title: "Bienvenido a DHaunters",
      bannersLength: banners.length,
      banners,
      products,
      scripts,
    });
  },
};

module.exports = mainController;
