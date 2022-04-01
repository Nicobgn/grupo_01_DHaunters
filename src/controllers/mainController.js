const path = require("path");
const views = path.join(__dirname + "/../views");
const mainController = {
  home: (req, res) => {
    res.render(views + "/home.ejs", {
      css: "Home",
      title: "Bienvenido a DHaunters",
    });
  },
  error404: (req, res) => {
    res.render("Página no encontrada");
  },
};

module.exports = mainController;
