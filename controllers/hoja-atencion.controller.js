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
          /*  order: [["id_turno", "ASC"]], */
          /*  limit: 10,
          offset: 0, */
          /*   where:{id_turno: 1,}, */

          include: [
            { model: db["his_turno"] },
            {
              model: db["t_usuario"],
              attributes: { exclude: ["pass_usuario"] },
              as: "responsable",
            },
          ],
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
      var hoja = await db["his_hoja_atencion"].create(req.body, {
        transaction: t,
      });
      await t.commit();
      response.sendCreated(res, hoja);
    } catch (error) {
      await t.rollback();
      response.sendBadRequest(res, error.message);
    }
  }
  async putAtencion(req, res) {
    const t = await db.sequelize.transaction();
    try {
      var hoja = await db["his_hoja_atencion"].findOne({
        where: { id_hoja_atencion: req.body.id_hoja_atencion },
      });
      if (!hoja) {
        response.sendNotFound(
          res,
          "No existe la hoja de atención: " + req.body.id_hoja_atencion
        );
      }
      hoja = req.body;
      response.sendData(res, await hoja.save(),"Se ha actualizado correctamente");
      /* response.sendCreated(res, newTurno); */
    } catch (error) {
      response.sendBadRequest(res, error.message);
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
