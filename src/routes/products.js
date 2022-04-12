const path = require("path");
const express = require("express");
const views = path.join(__dirname + "/../views");
const {
  details,
  store,
  createProduct,
} = require("../controllers/productController");
const router = express.Router();

router.get("/", store);
router.get("/productDetails", details);
router.get("/createProduct", createProduct);

module.exports = router;
