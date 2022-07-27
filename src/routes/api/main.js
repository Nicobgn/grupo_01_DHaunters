// Requiring Libraries
const express = require("express");

// Requiring Controller && Middlewares
const controller = require("../../controllers/api/main");

// Router
const router = express.Router();

// List all
router.get("/dashboard", controller.dashboard);

module.exports = router;
