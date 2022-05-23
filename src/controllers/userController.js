const fs = require("fs");
const path = require("path");

const views = path.join(__dirname + "/../views");

// Path de los JSON
const productPath = path.join(__dirname + "/../data/newOnSale.json");
const usersPath = path.join(__dirname + "/../data/users.json");

// Parseo de los path
const product = JSON.parse(fs.readFileSync(productPath, "utf-8"));
const users = JSON.parse(fs.readFileSync(usersPath, "utf-8"));

//Middlewares
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const { fileURLToPath } = require("url");

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
    //proceso de validacion de errores
    let errors = validationResult(req);

    if (errors.isEmpty()) {
      //proceso de creacion de usuario
      let id = users[users.length - 1].id + 1;
      console.log(req.body);
      let {
        first_name,
        last_name,
        user_name,
        email,
        adress,
        password,
        tyc,
        accept_send,
      } = req.body;

      //Encriptacion de la contraseña
      password = bcrypt.hashSync(req.body.password, 10);

      //Nombre del archivo multer

      let image = "";
      if (req.file) {
        image= req.file.filename
      }else{
        image = "user_default.jpg";
      }

      let newUser = {
        id,
        first_name,
        last_name,
        user_name,
        email,
        adress,
        password,
        tyc,
        category: "user",
        accept_send,
        image,
      };

      users.push(newUser);
      let newListJSON = JSON.stringify(users);
      fs.writeFileSync(usersPath, newListJSON, "utf-8");

      res.redirect("/user/login");
    } else {
      res.render(views + "/users/sign-up.ejs", {
        css: "Forms",
        title: "Registrate - DHaunters",
        errors: errors.mapped(),
        old: req.body,
      });
    }
  },
};

module.exports = userController;
