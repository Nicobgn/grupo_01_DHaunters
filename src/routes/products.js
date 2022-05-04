const path = require("path");
const express = require("express");
const productController = require("../controllers/productController");
const router = express.Router();

/* ------------Multer------------ */
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, path.join(__dirname, "/../../public/img"));
  },
  filename: (req, file, cb) => {
    let newName = `${Date.now()}-${file.originalname}`;
    cb(null, newName);
  },
});

const upload = multer({ storage });

/* ------------------------------------- */
/* solo tengo que ver todos los productos listados */
router.get("/", productController.store);

/* detalle del producto solo vista aca falta el /:id */
router.get("/productDetails/:id", productController.details);

/* editar producto detallado */
router.get("/editProduct/:id", productController.edit); //para ver el detalle de un producto determinado
router.put("/editProduct/:id", upload.single("img"), productController.update); //para editar el detalle de un producto determinado

/* ruta para eliminar un producto */
router.delete("/productDetails/:id", productController.delete); //para eliminar el detalle de un producto determinado

/* rutas para crear un producto y que se guarde en el json */
router.get("/createProduct", productController.createProduct);
router.post("/createProduct", upload.single("img"), productController.create); //para crear un producto metodo post

module.exports = router;
