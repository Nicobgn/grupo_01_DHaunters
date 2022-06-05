const { body } = require("express-validator");
const path = require("path");
const fs = require("fs");

const usersPath = path.join(__dirname + "/../data/users.json");
const users = JSON.parse(fs.readFileSync(usersPath, "utf-8"));

const validation = [
  body("name").notEmpty().withMessage('Debes ingresar un nombre para el producto'), 
  body("price")
    .notEmpty().
    withMessage('Debes ingresar el precio del producto')
    .bail()
    .isNumeric()
    .withMessage('Debe ser un numero'),
  body('img').custom((value, {req}) => {
    let file = req.file
    let extencionesPermitidas = ['.jpg', '.jpeg', '.npg']

    if (!file) {
      throw new Error("Tienes que subir una imagen en formato jpg, jpeg o npg");
    } else {
        let extencionDelArchivo = path.extname(file.originalname);
        if (extencionesPermitidas.includes(extencionDelArchivo)) {
          throw new Error("Las extenciones permitidas son .jpg .jpeg .npg");
        }
      }
    return true
    }),
  body('shortDesc').notEmpty().withMessage('Debes ingresar una breve descripcion del producto'),
  body('longDesc').notEmpty().withMessage('Debes realizar la descripcion completa del producto'),
  body('category').notEmpty().withMessage('Debes seleccionar una categoria'),  
  body('universe').notEmpty().withMessage('Debes seleccionar un universo')
];

module.exports = validation;
