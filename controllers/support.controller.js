const db = require("../models/index");
const response = require("../helpers/response");

class SupportController {
  /**
   * @api {get} /v1/support/turno/:id Obtener turno por id
   * @apiGroup Support
   * @apiName getOneTurno
   * @apiContentType application/json
   * @apiHeader {String} Authorization JWT Authorization generated from /login
   * @apiParams {String} id String id
   *
   */

  
  async getOneTurno(req, res) {
    try {
      await db["his_turno"]
        .findOne({
          where: { id_turno: req.params.id },
        })
        .then((val) => {
          response.sendData(res, val, "success");
        })
        .catch((errro) => {
          response.sendForbidden(res, errro);
        });
    } catch (error) {
      response.sendBadRequest(res, error.message);
    }
  }
 /**
   * @api {get} /v1/support/turno Obtener lista de turnos
   * @apiGroup Support
   * @apiName getAllTurnos
   * @apiContentType application/json
   * @apiHeader {String} Authorization JWT Authorization generated from /login
   *
   */
  async getAllTurnos(req, res) {
    try {
      await db["his_turno"]
        .findAll()
        .then((val) => {
          response.sendData(res, val, "success");
        })
        .catch((errro) => {
          response.sendForbidden(res, errro);
        });
    } catch (error) {
      response.sendBadRequest(res, error.message);
    }
  }

  async getOneUPS(req, res) {
    try {
      await db["maestro_his_ups"]
        .findOne({
          where: { id: req.params.id },
        })
        .then((val) => {
          response.sendData(res, val, "success");
        })
        .catch((errro) => {
          response.sendForbidden(res, errro);
        });
    } catch (error) {
      response.sendBadRequest(res, error.message);
    }
  }

  async getAllUPS(req, res) {
    try {
      await db["maestro_his_ups"]
        .findAll({
          limit: 100,
        })
        .then((val) => {
          response.sendData(res, val, "success");
        })
        .catch((errro) => {
          response.sendForbidden(res, errro);
        });
    } catch (error) {
      response.sendBadRequest(res, error.message);
    }
  }

  async getOnePerfil(req, res) {
    try {
      await db["perfil"]
        .findOne({
          where: { id_perfil: req.params.id },
        })
        .then((val) => {
          response.sendData(res, val, "success");
        })
        .catch((errro) => {
          response.sendForbidden(res, errro);
        });
    } catch (error) {
      response.sendBadRequest(res, error.message);
    }
  }

  async getAllPerfil(req, res) {
    try {
      await db["perfil"]
        .findAll()
        .then((val) => {
          response.sendData(res, val, "success");
        })
        .catch((errro) => {
          response.sendForbidden(res, errro);
        });
    } catch (error) {
      response.sendBadRequest(res, error.message);
    }
  }

  async getOneCie(req, res) {
    try {
      await db["maestro_his_cie_cpms"]
        .findOne({
          where: { id: req.params.id },
        })
        .then((val) => {
          response.sendData(res, val, "success");
        })
        .catch((errro) => {
          response.sendForbidden(res, errro);
        });
    } catch (error) {
      response.sendBadRequest(res, error.message);
    }
  }

  async getAllCie(req, res) {
    try {
      await db["maestro_his_cie_cpms"]
        .findAll({
            limit:100
        })
        .then((val) => {
          response.sendData(res, val, "success");
        })
        .catch((errro) => {
          response.sendForbidden(res, errro);
        });
    } catch (error) {
      response.sendBadRequest(res, error.message);
    }
  }

  async getOneFinanciador(req, res) {
    try {
      await db["maestro_his_financiador"]
        .findOne({
          where: { id: req.params.id },
        })
        .then((val) => {
          response.sendData(res, val, "success");
        })
        .catch((errro) => {
          response.sendForbidden(res, errro);
        });
    } catch (error) {
      response.sendBadRequest(res, error.message);
    }
  }

  async getAllFinanciador(req, res) {
    try {
      await db["maestro_his_financiador"]
        .findAll()
        .then((val) => {
          response.sendData(res, val, "success");
        })
        .catch((errro) => {
          response.sendForbidden(res, errro);
        });
    } catch (error) {
      response.sendBadRequest(res, error.message);
    }
  }

  async getOneCentroPoblado(req, res) {
    try {
      await db["maestro_his_centro_poblado"]
        .findOne({
          where: { id: req.params.id },
        })
        .then((val) => {
          response.sendData(res, val, "success");
        })
        .catch((errro) => {
          response.sendForbidden(res, errro);
        });
    } catch (error) {
      response.sendBadRequest(res, error.message);
    }
  }

  async getAllCentroPoblado(req, res) {
    try {
      await db["maestro_his_centro_poblado"]
        .findAll({limit:10})
        .then((val) => {
          response.sendData(res, val, "success");
        })
        .catch((errro) => {
          response.sendForbidden(res, errro);
        });
    } catch (error) {
      response.sendBadRequest(res, error.message);
    }
  }

  /* UBIGEO */


  /* UBIGEO */
}
module.exports = new SupportController();
