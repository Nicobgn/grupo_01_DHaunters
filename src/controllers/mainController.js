const path = require("path");
const views = path.join(__dirname + "/../views");
const fs = require("fs");
const newOnSalePath = path.join(__dirname, "../data/newOnSale.json");
let newOnSale = JSON.parse(fs.readFileSync(newOnSalePath, "utf-8"));
const bannerPath = path.join(__dirname, "../data/banner.json")
let banner = JSON.parse(fs.readFileSync(bannerPath, "utf-8"))

const mainController = {
  home: (req, res) => {
    res.render(views + "/home.ejs", {
      css: "Home",
      title: "Bienvenido a DHaunters",
      newOnSale,
      banner,
    });
  },
  error404: (req, res) => {
    res.render("Página no encontrada");
  },
};

module.exports = mainController;
