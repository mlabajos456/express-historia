const express = require("express");
const router = express.Router();

const validateMiddleware = require("../middlewares/validate.middleware");
const EmployeeValidationRules = require("../validation-rules/usuario.rule");
const controller = require("../controllers/usuario.controller");

require("express-async-errors");

router.get(
    "/usuario",
    controller.listar
);

/* router.post(
    "/usuario",
    validateMiddleware(EmployeeValidationRules.create),
    HojaAtencionController.postAtencion
); */

/* 
router.put(
    "/usuario",
    validateMiddleware(EmployeeValidationRules.edit),
    HojaAtencionController.putAtencion
);
router.delete(
    "/usuario/:id",
    validateMiddleware(EmployeeValidationRules.delete),
    HojaAtencionController.deleteAtencion
);
router.get(
    "/usuario/:id",
    validateMiddleware(EmployeeValidationRules.findOne),
    HojaAtencionController.getAtencion
); */

module.exports = router;
