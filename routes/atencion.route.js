const express = require("express");
const router = express.Router();

const AtencionValidationRules = require("../validation-rules/atencion.rule");
const validateMiddleware = require("../middlewares/validate.middleware");
const AtencionController = require("../controllers/atencion.controller");

require("express-async-errors");

router.post("/atencion/:id", AtencionController.getAllAtencion);
router.get("/atencion/:id", 
    validateMiddleware(AtencionValidationRules.findOne),
    AtencionController.getOneAtencion);
router.post(
    "/atencion",
    validateMiddleware(AtencionValidationRules.create),
    AtencionController.postAtencion
); 
router.put(
    "/atencion",
    validateMiddleware(AtencionValidationRules.edit),
    AtencionController.putAtencion
);
router.delete(
    "/atencion/:id",  
    AtencionController.deleteAtencion
);/*
router.get(
  "/atencion/:id",
  validateMiddleware(AtencionValidationRules.findOne),
  AtencionController.getAtencion
); */

module.exports = router;
