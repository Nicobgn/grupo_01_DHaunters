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
  processLogin,
  userProfile,
} = require("../controllers/userController");
const router = express.Router();

//Middlewares
const {registerValidator, loginValidator} = require('../middleWares/validatorForUsers');

const multer = require('../middleWares/multer-singup');

// Routs for login
router.get("/login", login);
router.post("/login", loginValidator, processLogin)
router.get("/profile", userProfile)

// Routs for sign-up
router.get("/register", register);
router.post("/register", multer, registerValidator, createUser);

//Other routs 
router.get("/cart", cart);
router.get("/collection", collection);
router.get("/favourites", favourites);

module.exports = router;
