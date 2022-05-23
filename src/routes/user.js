const path = require("path");
const express = require("express");
const controller = require("../controllers/userController");
const {
  login,
  register,
  cart,
  collection,
  favourites,
  createUser,
} = require("../controllers/userController");
const router = express.Router();

//Middlewares
const validator = require('../middleWares/validatorForUsers');
const multer = require('../middleWares/multer-singup');

// Routs for forms
router.get("/login", login);
// router.post()
router.get("/register", register);
router.post("/register", multer, validator, createUser);

router.get("/cart", cart);
router.get("/collection", collection);
router.get("/favourites", favourites);

module.exports = router;
