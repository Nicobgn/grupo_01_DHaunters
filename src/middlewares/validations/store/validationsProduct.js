// Requiring Libraries
const { body } = require("express-validator");
const path = require("path");
const db = require("../../../database/models");

// Placing abbreviations of Models
const Address = db.Address;
const Order = db.Order;
const OrderDetail = db.OrderDetail;
const Product = db.Product;
const Tier = db.Tier;
const Universe = db.Universe;
const User = db.User;
const UserAddress = db.UserAddress;

// Requiring Scripts & Declaring Variables

const validations = [
  body("name")
    .notEmpty()
    .withMessage("Debes ingresar un nombre para el producto")
    .bail()
    .custom(async (value, { req }) => {
      let alreadyExist = await Product.findOne({
        where: {
          name: value,
        },
      });

      if (alreadyExist) {
        throw new Error("Este nombre de usuario está en uso.");
      } else {
        return true;
      }
    }),
  body("price")
    .notEmpty()
    .withMessage("Debes ingresar el precio del producto")
    .bail()
    .isNumeric()
    .withMessage("Debe ser un numero"),
  body("img").custom((value, { req }) => {
    let file = req.file;
    let extencionesPermitidas = [".jpg", ".jpeg", ".npg"];

    if (!file) {
      throw new Error("Tienes que subir una imagen en formato jpg, jpeg o npg");
    } else {
      let extencionDelArchivo = path.extname(file.originalname);
      if (extencionesPermitidas.includes(extencionDelArchivo)) {
        throw new Error("Las extenciones permitidas son .jpg .jpeg .npg");
      }
    }
    return true;
  }),
  body("shortDesc")
    .notEmpty()
    .withMessage("Debes ingresar una breve descripcion del producto"),
  body("longDesc")
    .notEmpty()
    .withMessage("Debes realizar la descripcion completa del producto"),
  body("category").notEmpty().withMessage("Debes seleccionar una categoria"),
  body("universe").notEmpty().withMessage("Debes seleccionar un universo"),
];

module.exports = validations;
