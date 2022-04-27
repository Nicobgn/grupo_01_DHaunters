const path = require("path");
const express = require("express");
const views = path.join(__dirname + "/../views");
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


// Routs for forms
router.get("/login", login);
router.get("/register", register);
router.post("/register", createUser)


router.get("/cart", cart);
router.get("/collection", collection);
router.get("/favourites", favourites);

module.exports = router;
