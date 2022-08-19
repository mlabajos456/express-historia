const express = require("express");
const router = express.Router();
const AuthValidationRules = require("../validation-rules/auth.rule");
const validateMiddleware = require("../middlewares/validate.middleware");
const AuthController = require("../controllers/auth.controller");

module.exports = router.post("/login", AuthController.authenticate);