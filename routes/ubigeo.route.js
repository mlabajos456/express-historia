const express = require("express");
const router = express.Router();
/* 
require("express-async-errors"); */
const controller = require("../controllers/ubigeo.controller");
router.get(
    "/redes", 
    controller.redes
);
module.exports = router;