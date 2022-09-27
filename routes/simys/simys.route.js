const express = require("express");
const router = express.Router();
const AuthController = require("../../controllers/simys/simys.controller");

module.exports = router.post("/login", AuthController.authenticate);