const path = require("path");
const express = require("express");
const views = path.join(__dirname + "/../views");
const { home, error404 } = require("../controllers/mainController");
const router = express.Router();

router.get("/", home);
router.get("/404", error404);

module.exports = router;
