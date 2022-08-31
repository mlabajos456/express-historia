const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth.controller");

module.exports = router.post("/login", AuthController.authenticate);