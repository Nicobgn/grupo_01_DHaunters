const path = require("path");
const views = path.join(__dirname + "/../views");
const fs = require("fs");
const newOnSalePath = path.join(__dirname, "../data/newOnSale.json");
let newOnSale = JSON.parse(fs.readFileSync(newOnSalePath, "utf-8"));

const mainController = {
  home: (req, res) => {
    res.render(views + "/home.ejs", {
      css: "Home",
      title: "Bienvenido a DHaunters",
      newOnSale
    });
  },
  error404: (req, res) => {
    res.render("Página no encontrada");
  },
};

module.exports = mainController;
