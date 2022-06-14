const { body } = require("express-validator");
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcryptjs");

const usersPath = path.join(__dirname + "/../data/users.json");
const users = JSON.parse(fs.readFileSync(usersPath, "utf-8"));

const registerValidator = [
  body("first_name")
    .notEmpty()
    .withMessage("Debes completar este campo")
    .bail()
    .isAlpha("en-US", { ignore: " " })
    .withMessage("Solo debe contener letras")
    .bail()
    .isLength({ min: 4 })
    .withMessage("Tu nombre debe tener al menos 4 caracteres"),

  body("last_name")
    .notEmpty()
    .withMessage("Debes completar este campo")
    .bail()
    .isLength({ min: 4 })
    .withMessage("Tu apellido debe tener al menos 4 caracteres")
    .bail()
    .isAlpha("en-US", { ignore: " " })
    .withMessage("Solo debe contener letras"),

  body("user_name")
    .notEmpty()
    .withMessage("Debes completar este campo")
    .bail()
    .isLength({ min: 4 })
    .withMessage("Tu nombre de usuario debe tener al menos 4 caracteres")
    .bail()
    .isAlphanumeric("en-US", { ignore: " " })
    .withMessage("Solo se permiten numero y letras")
    .bail()
    .custom((value, { req }) => {
      if (users.find((element) => element.user_name == req.body.user_name)) {
        throw new Error("Este nombre de usuario no esta disponible");
      }

      return true;
    }),
  body("email")
    .notEmpty()
    .withMessage("Debes completar este campo")
    .bail()
    .isEmail()
    .withMessage("Debe ser un email valido")
    .bail()
    .custom((value, { req }) => {
      if (users.find((element) => element.email == req.body.email)) {
        throw new Error("Este email ya esta registrado");
      }

      return true;
    }),

  body("adress")
    .notEmpty()
    .withMessage("Debes completar este campo")
    .bail()
    .isLength({ min: 6 })
    .withMessage("Debe ser una direccion valida"),

  body("password")
    .notEmpty()
    .withMessage("Debes completar este campo")
    .bail()
    .isStrongPassword()
    .withMessage(
      "Tu contraseña debe contener al menos 1 Minus, 1 Mayus, 1 Num y 1 Simbolo"
    )
    .bail()
    .custom((value, { req }) => {
      let checkPassword = req.body.checkPassword;
      let password = req.body.password;
      if (password != checkPassword) {
        throw new Error("Las contraseñas no coinciden");
      }
      return true;
    }),

  body("checkPassword").notEmpty().withMessage("Debes completar este campo"),

  body("tyc").notEmpty().withMessage("Debes completar este campo"),

  body("image").custom((value, { req }) => {
    if (req.file) {
      let extName = path.extname(req.file.originalname);
      if (extName != ".jpg" && extName != ".png" && extName) {
        throw new Error("Debes seleccionar una imagen de formato valido");
      }
    }
    return true;
  }),
];
const loginValidator = [
  body("dato_ingreso")
    .notEmpty()
    .withMessage("Debes completar este campo")
    .bail()
    .custom((value, { req }) => {
      let datoIngreso = req.body.dato_ingreso;
      let user = users.find(
        (user) => user.email == datoIngreso || user.name == datoIngreso
      );

      if (!user) {
        throw new Error("Este usuario no se encuentra registrado");
      }
      return true;
    }),
  body("password").custom((value, { req }) => {
    let datoIngreso = req.body.dato_ingreso;
    let user = users.find(
      (user) => user.email == datoIngreso || user.name == datoIngreso
    );

    if (user) {
      let check = bcrypt.compareSync(req.body.password, user.password);
      if (!check) {
        throw new Error("Contraseña incorrecta");
      }
    }
    return true
  }),
];
module.exports = { registerValidator, loginValidator };
