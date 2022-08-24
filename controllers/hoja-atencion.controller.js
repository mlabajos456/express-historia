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
      var newTurno = await db["his_atencion"].create(req.body, {
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
      /*  if (typeof beforeTurno === 'null') {
        return response.sendBadRequest(
          res,
          "NO existe el id: " + req.body.id_turno
        );
      } 
      beforeTurno = req.body;      
      */

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
module.exports = new AtencionController();
