const path = require("path");
const express = require("express");
const views = path.join(__dirname + "/../views");
const productController = require("../controllers/productController");
const router = express.Router();

/* solo tengo que ver todos los productos listados */
router.get("/", productController.store);

/* detalle del producto solo vista aca falta el /:id */
router.get("/productDetails/:id", productController.details);

/* editar producto detallado */
router.get("/editProduct/:id", productController.edit); //para ver el detalle de un producto determinado
router.put("/editProduct/:id", productController.updeat); //para editar el detalle de un producto determinado

/* ruta para eliminar un producto */
router.delete("/:id", productController.delete); //para eliminar el detalle de un producto determinado

/* rutas para crear un producto y que se guarde en el json */
router.get("/createProduct", productController.createProduct);
//router.post("/productCreate") para crear un producto metodo post

module.exports = router;
