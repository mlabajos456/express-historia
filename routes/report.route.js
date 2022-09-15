const express = require("express");
const router = express.Router();

/* const EmployeeValidationRules = require("../validation-rules/employee.rule");
const validateMiddleware = require("../middlewares/validate.middleware"); */
const reportesController = require("../controllers/reportes.controller");
require("express-async-errors");

router.get(
    "/reporte/:id",    
    reportesController.getReportes
);

module.exports = router;
