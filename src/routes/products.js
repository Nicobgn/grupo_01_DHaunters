const path = require("path");
const express = require("express");
const views = path.join(__dirname + "/../views");
const { details, store } = require("../controllers/productController");
const router = express.Router();

router.get("/", store);
router.get("/productDetails", details);

module.exports = router;
