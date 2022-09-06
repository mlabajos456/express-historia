const express = require("express");
const router = express.Router();

const HojaAValidationRules = require("../validation-rules/hoja-atencion.rule");
const validateMiddleware = require("../middlewares/validate.middleware");
const HojaAtencionController = require("../controllers/hoja-atencion.controller");

require("express-async-errors");

/* router.get("/hoja-atencion", HojaAtencionController.getAtencion); */
router.post(
    "/hoja-atencion",
    validateMiddleware(HojaAValidationRules.create),
    HojaAtencionController.postHojaAtencion
);
router.put(
    "/hoja-atencion",
    validateMiddleware(HojaAValidationRules.edit),
    HojaAtencionController.putHojaAtencion
);
router.post(
    "/hoja-atencion/:id/del",
    validateMiddleware(HojaAValidationRules.findOne),
    HojaAtencionController.deleteHojaAtencion
);
router.get(
    "/hoja-atencion/:id",
    validateMiddleware(HojaAValidationRules.findOne),
    HojaAtencionController.getOneHojaAtencion
);
router.get(
    "/hoja-atencion",
 
    HojaAtencionController.getAllHojaAtencion
);

module.exports = router;
