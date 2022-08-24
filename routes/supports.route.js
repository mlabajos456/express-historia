const express = require("express");
const router = express.Router();

const SupportValidationRules = require("../validation-rules/supports.rule");
const validateMiddleware = require("../middlewares/validate.middleware");
const SupportController = require("../controllers/support.controller");

require("express-async-errors");

router.get("/turno", SupportController.getAllTurnos);
router.get(
  "/turno/:id",
  validateMiddleware(SupportValidationRules.findOne),
  SupportController.getOneTurno
);

router.get("/ups", SupportController.getAllUPS);
router.get(
  "/ups/:id",
  validateMiddleware(SupportValidationRules.findOne),
  SupportController.getOneUPS
);
router.get("/perfil", SupportController.getAllPerfil);
router.get(
  "/perfil/:id",
  validateMiddleware(SupportValidationRules.findOne),
  SupportController.getOnePerfil
);

router.get("/cie", SupportController.getAllCie);
router.get(
  "/cie/:id",
  validateMiddleware(SupportValidationRules.findOne),
  SupportController.getOneCie
);

router.get("/financiador", SupportController.getAllFinanciador);
router.get(
  "/financiador/:id",
  validateMiddleware(SupportValidationRules.findOne),
  SupportController.getOneFinanciador
);

router.get("/centro-poblado", SupportController.getAllCentroPoblado);
router.get(
  "/centro-poblado/:id",
  validateMiddleware(SupportValidationRules.findOne),
  SupportController.getOneCentroPoblado
);

module.exports = router;
