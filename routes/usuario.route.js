const express = require("express");
const router = express.Router();
const validateMiddleware = require("../middlewares/validate.middleware");
const { pagination } = require("../validation-rules/usuario.rule");
const controller = require("../controllers/usuario.controller");

require("express-async-errors");

router.get(
    "/usuario",
    controller.mostarUsuario
);

router.post(
    "/usuario-listar",
    validateMiddleware(pagination),
    controller.listar
);

router.delete(
    "/usuario-eliminar/:id",
    controller.eliminar
);
module.exports = router;
