const express = require("express");
const router = express.Router();

const EmployeeValidationRules = require("../validation-rules/employee.rule");
const validateMiddleware = require("../middlewares/validate.middleware");
const HojaAtencionController = require("../controllers/hoja-atencion.controller");

require("express-async-errors");

router.get("/hoja-atencion", HojaAtencionController.getAtencion);
router.get(
  "/hoja-atencion/:id",
  validateMiddleware(EmployeeValidationRules.findOne),
  HojaAtencionController.getAtencion
);

module.exports = router;
