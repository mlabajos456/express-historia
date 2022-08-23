const express = require("express");
const router = express.Router();

const EmployeeValidationRules = require("../validation-rules/employee.rule");
const validateMiddleware = require("../middlewares/validate.middleware"); 
const AtencionController = require("../controllers/atencion.controller");

require("express-async-errors");

router.get("/atencion", AtencionController.getAtencion);
router.post(
  "/atencion",
  validateMiddleware(EmployeeValidationRules.create),
  AtencionController.postAtencion
);

module.exports = router;
