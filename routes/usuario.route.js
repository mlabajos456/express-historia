const express = require("express");
const router = express.Router();

/* const validateMiddleware = require("../middlewares/validate.middleware");
const EmployeeValidationRules = require("../validation-rules/usuario.rule"); */
const controller = require("../controllers/usuario.controller");

require("express-async-errors");

router.get(
    "/usuario",
    controller.mostarUsuario
);

router.get(
    "/usuario-listar",
    controller.listar
);
module.exports = router;
