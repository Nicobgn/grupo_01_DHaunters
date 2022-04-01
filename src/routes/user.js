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
} = require("../controllers/userController");
const router = express.Router();

router.get("/login", login);
router.get("/cart", cart);
router.get("/register", register);
router.get("/collection", collection);
router.get("/favourites", favourites);

module.exports = router;
