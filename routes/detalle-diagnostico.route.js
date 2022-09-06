const express = require("express");
const router = express.Router();

/* const HojaAValidationRules = require("../validation-rules/detalle-diagnostico.rule"); */
/* const validateMiddleware = require("../middlewares/validate.middleware"); */
const DetalleDiagController = require("../controllers/detalle-diagnostico.controller");

require("express-async-errors");

router.get("/detalle-diagnostico", DetalleDiagController.getAllDetalleDiagnostico);
router.get(
    "/detalle-diagnostico/:id",
    DetalleDiagController.getOneDetalleDiagnostico
);

module.exports = router;
