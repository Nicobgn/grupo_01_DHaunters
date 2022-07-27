// Requiring Libraries
const express = require("express");

// Requiring Controller, Middlewares & Scripts
const controller = require("../controllers/main");

// Router
const router = express.Router();

router.get("/", controller.home);

module.exports = router;
