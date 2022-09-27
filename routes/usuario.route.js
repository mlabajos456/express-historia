const express = require("express");
const router = express.Router();
const validateMiddleware = require("../middlewares/validate.middleware");
const { pagination } = require("../validation-rules/usuario.rule");
const controller = require("../controllers/usuario.controller");

require("express-async-errors");
//listar usuario
router.post(
    "/usuario-listar",
    validateMiddleware(pagination),
    controller.list
);

//agregar usuario
router.post(
    "/usuario-crear",
    controller.created
);

//eliminar usuario
router.delete(
    "/usuario-eliminar/:id",
    controller.deleted
);

/**
 * OTROS
 */
//mostrar usuario logueado
router.get(
    "/usuario",
    controller.mostarUsuario
);
//listar perfiles
router.get(
    "/listar-perfiles",
    controller.listarPerfiles
);
//buscar personal
router.post(
    "/buscar-personal",
    controller.buscarPersonal
);

module.exports = router;
