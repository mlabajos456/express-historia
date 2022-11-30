const express = require("express");
const router = express.Router();

const atencionPrenatalRule = require("../../validation-rules/atencion_prenatal.rule");
const validateMiddleware = require("../../middlewares/validate.middleware");
const atencionPrenatalController = require("../../controllers/simys/atencion_prenatal_hoja.controller");

require("express-async-errors");

router.get("/", validateMiddleware(atencionPrenatalRule.findOneAtencionPrenatal), atencionPrenatalController.getOneAtencionPrenatal);
/* router.get("/detalle-diagnostico", DetalleDiagController.getAllDetalleDiagnostico);
router.get(
    "/detalle-diagnostico/:id",
    DetalleDiagController.getOneDetalleDiagnostico
); */
router.post("/", /* validateMiddleware(atencionPrenatalRule.createAtencionPrenatal), */atencionPrenatalController.postAtencionPrenatal)
router.put("/", validateMiddleware(atencionPrenatalRule.editAtencionPrenatal), atencionPrenatalController.putAtencionPrenatal)

module.exports = router;
