const express = require("express");
const router = express.Router();

const EmployeeValidationRules = require("../validation-rules/employee.rule");
const validateMiddleware = require("../middlewares/validate.middleware");
const HojaAtencionController = require("../controllers/hoja-atencion.controller");

require("express-async-errors");

/* router.get("/hoja-atencion", HojaAtencionController.getAtencion); */
router.post(
    "/hoja-atencion",
    validateMiddleware(EmployeeValidationRules.create),
    HojaAtencionController.postAtencion
);
router.put(
    "/hoja-atencion",
    validateMiddleware(EmployeeValidationRules.edit),
    HojaAtencionController.putAtencion
);
router.delete(
    "/hoja-atencion/",
    validateMiddleware(EmployeeValidationRules.delete),
    HojaAtencionController.deleteAtencion
);
router.get(
    "/hoja-atencion/:id",
    validateMiddleware(EmployeeValidationRules.findOne),
    HojaAtencionController.getAtencion
);

module.exports = router;
