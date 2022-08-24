const db = require("../models/index");
const response = require("../helpers/response");

class SupportController {
  /**
   * @api {get} /v1/atencion/ Obtener lista de pacientes
   * @apiGroup Atencion
   * @apiName GetAllAtenciones
   * @apiContentType application/json
   * @apiHeader {String} token JWT token generated from /login
   *
   */

  async getOneTurno(req, res) {
    try {
      await db["his_turno"]
        .findOne({
          where: { id_turno: 1 },
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
}
module.exports = new SupportController();
