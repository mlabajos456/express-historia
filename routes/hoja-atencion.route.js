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
  HojaAtencionController.postAtencion
);
router.put(
  "/hoja-atencion",
  validateMiddleware(HojaAValidationRules.edit),
  HojaAtencionController.putAtencion
);
router.delete(
  "/hoja-atencion",
  validateMiddleware(HojaAValidationRules.delete),
  HojaAtencionController.deleteAtencion
);
router.get(
  "/hoja-atencion/:id",
  validateMiddleware(HojaAValidationRules.findOne),
  HojaAtencionController.getAtencion
);

module.exports = router;
