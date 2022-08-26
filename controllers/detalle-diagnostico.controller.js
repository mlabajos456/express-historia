const db = require("../models/index");
const response = require("../helpers/response");

class DetalleDiagnosticoController {
  /**
   * @api {get} /v1/detalle-diagnostico/get Obtener lista de diagnosticos
   * @apiGroup Atencion
<<<<<<< HEAD:controllers/detalle-diagnostico.model.js
   * @apiName GetDiagnosticos
   * @apiHeader {String} Authorization JWT Authorization generated from /login
=======
   * @apiName GetAllAtenciones
   * @apiHeader {String} token JWT token generated from /login
>>>>>>> 62d1e06e4bff133c10efb61301b60feeac3b1848:controllers/detalle-diagnostico.controller.js
   *
   */

  async getAllDetalleDiagnostico(req, res) {
    try {
      await db["his_detalle_diagnostico"]
        .findAll({
          order: [["id_cie10", "DESC"]],
          limit: 10,
          offset: 0,
          where:{id_atencion: req.body.id_atencion,}, 

          include: [{ model: db["maestro_his_cie_cpms"], as :"cie"}],
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

  async getOneDetalleDiagnostico(req, res) {
    try {
      await db["his_detalle_diagnostico"]
        .findOne({
          order: [["id_cie10", "DESC"]],
          where: { id_detalle: req.body.id_detalle },
          /*  include: [
            { model: db["his_turno"] },
            {
              model: db["t_usuario"],
              attributes: { exclude: ["pass_usuario"] },
              as: "responsable",
            },
          ], */
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

  async postAtencion(req, res) {
    const t = await db.sequelize.transaction();
    try {
      /*  var turno = await db["his_turno"].build(req.body);
      await turno.save(); */
      /* Corta */
      var newTurno = await db["his_turno"].create(req.body, {
        transaction: t,
      });
      await t.commit();
      response.sendCreated(res, newTurno);
    } catch (error) {
      await t.rollback();
      response.sendBadRequest(res, error.message);
    }
  }
  async putAtencion(req, res) {
    try {
      var beforeTurno = await db["his_turno"].findOne({
        where: { id_turno: req.body.id_turno },
      });

      response.sendBadRequest(res, await beforeTurno.save());
      /* response.sendCreated(res, newTurno); */
    } catch (error) {
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
module.exports = new DetalleDiagnosticoController();
