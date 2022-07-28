// Requiring Dependencies
const path = require("path");
const multer = require("multer");
const express = require("express");
const productCreate = require('../middlewares/validations/store/validationsProduct')

// Requiring Controller && Middlewares
const controller = require("../controllers/store");

const adminHandler = require("../middlewares/handlers/adminHandler");

const formattedDate = require("../middlewares/other/formattedDate");

// Setting Multer
const upload = require("../middlewares/utilities/productMulter");

// Router
const router = express.Router();

// Lists Products
router.get("/", controller.store);

// Universe Routes
router.get("/universe", adminHandler, controller.universeList);
router.get("/universe/create", adminHandler, controller.universeCreate);
router.post("/universe/create", adminHandler, controller.universeCreated);
router.get("/universe/:universe", adminHandler, controller.universeOne);

// Product Routes
router.get("/product/create", adminHandler, controller.productCreate);
router.post(
  "/product/create",
  upload.single("image"),
  controller.productCreated
);
// router.get("/search", controller.productSearch);
router.get("/:name/", controller.productDetail);
router.post("/:name/delete", adminHandler, controller.productDelete);
router.get("/:name/edit");

module.exports = router;
