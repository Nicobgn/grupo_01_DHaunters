const path = require("path");
const views = path.join(__dirname + "/../views");
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
    res.render(views + "/users/cart.ejs", {
      css: "Cart",
      title: "Carrito - DHaunters",
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
