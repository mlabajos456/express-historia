const express = require("express");
const router = express.Router();

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
