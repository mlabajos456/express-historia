const express = require("express");
const router = express.Router();

//const EmployeeValidationRules = require("../validation-rules/employee.rule");
//const validateMiddleware = require("../middlewares/validate.middleware"); */
//const CatalogoController = require("../controllers/demo.controller");

require("express-async-errors");

router.get("/atencion", require("../controllers/atencion.controller").index);


module.exports = router;