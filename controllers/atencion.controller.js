const db = require("../models/index");
const response = require("../helpers/response");

class AtencionController {
  /**
   * @api {get} /v1/atencion/ Obtener lista de pacientes
   * @apiGroup Atencion
   * @apiName GetAllAtenciones
   * @apiContentType application/json
   * @apiHeader {String} token JWT token generated from /login
   *
   */

  async getAtencion(req, res) {
    try {
      await db["his_hoja_atencion"]
        .findAll({
          include: [{ model: db["his_turno"] }, { model: db["t_usuario"] }],
        })
        .then((val) => {
          response.sendData(res, val, "success");
        })
        .catch((errro) => {
          console.log(errro);
          response.sendForbidden(res, errro);
        });
    } catch (error) {
      response.sendBadRequest(res, error.message);
    }
  }

  async postAtencion(req, res) {
    try {
      /* var turno = await db["his_turno"].build(req.body);
      await turno.save(); */
      const newTurno = await db["his_turno"].create(req.body);
      response.sendCreated(res, newTurno);
    } catch (error) {
      console.log(error);
      response.sendBadRequest(res, error.message);
    }
  }
  async putAtencion(req, res) {
    try {
      var beforeTurno = await db["his_turno"].findOne({
        where: { id_turno: req.body.id_turno },
      });
      beforeTurno.nombre_turno = req.body.nombre_turno;
      response.sendBadRequest(res, await beforeTurno.save());
      /* response.sendCreated(res, newTurno); */
    } catch (error) {
      console.log(error);
      response.sendBadRequest(res, "Error de consulta, contactese con OGTES");
    }
  }
  async deleteAtencion(req, res) {
    try {
      var beforeTurno = await db["his_turno"].findOne({
        where: { id_turno: req.body.id_turno },
      });
      response.sendBadRequest(res, await beforeTurno.destroy());
      /* response.sendCreated(res, newTurno); */
    } catch (error) {
      response.sendBadRequest(res, error.message);
    }
  }
}
module.exports = new AtencionController();
