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
//para cargar todos los departamentos.
router.get("/ubigeo/departamento", SupportController.getAllUbigeoDepatamento);
router.post("/ubigeo/departamento", SupportController.getAllUbigeoDepatamento);
//todas las provincias por codigo de departamento
router.get("/ubigeo/provincia/:codDep", SupportController.getAllUbigeoProvincia);
//todos los distritos por codigo de departamento y codigo de provincia
router.get("/ubigeo/distrito/:codDep/:codProv", SupportController.getAllUbigeoDistrito);

//cargar un departamento en específico
router.get( "/departamento/:id", validateMiddleware(SupportValidationRules.findOne), SupportController.getOneUbigeoDepatamento);
//carga una provincia de acuerdo aun departamento
router.get("/provincia/:codDep/:codProv",SupportController.getOneUbigeoProvincia);
//cargar un distrito por codigo de departamento y provincia
router.get("/distrito/:codDep/:codProv/:codDist",SupportController.getOnebigeoDistrito);

router.get("/establecimiento/red", SupportController.getAllRed);
router.get("/establecimiento/microRed/:codigoRed", SupportController.getAllMicroRed);
router.get("/establecimiento/ipress/:codigoRed/:codMicroRed", SupportController.getAllIpress);

router.get("/red/:id", SupportController.getOneRed);
router.get( "/microRed/:codigoRed", SupportController.getOneMicroRed);
router.get( "/ipress/:/codisa/:codMicroRed", SupportController.getOneIpress);
module.exports = router;
