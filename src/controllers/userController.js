const fs = require("fs");
const path = require("path");

const views = path.join(__dirname + "/../views");

// Path de los JSON
const productPath = path.join(__dirname + "/../data/newOnSale.json");
const usersPath = path.join(__dirname + "/../data/users.json");

// Parseo de los path
const product = JSON.parse(fs.readFileSync(productPath, "utf-8"));
const users = JSON.parse(fs.readFileSync(usersPath, "utf-8"));

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
    let productLength = Object.keys(product).length;

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

  createUser: (req, res) => {
    let id = users[users.length - 1].id + 1;
    console.log(req.body);

    let newUser = {
      id,
      ...req.body,
      category: "user",
      image: "deafaul.jpg",
    };

    users.push(newUser);
    let newListJSON = JSON.stringify(users);
    fs.writeFileSync(usersPath, newListJSON, "utf-8");

    res.redirect("/");
  },
};

module.exports = userController;
