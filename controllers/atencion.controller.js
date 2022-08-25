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

  async getAllAtencion(req, res) {
    try {
      await db["his_atencion"]
        .findAll({
          /*  order: [["id_turno", "ASC"]], */
          /*  limit: 10,
          offset: 0, */
          /*   where:{id_turno: 1,}, */

          include: [
            { model: db["his_turno"] },
            {
              model: db["personal"],
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
      var atencion = await db["his_atencion"].build(req.body);
      atencion.edad_anio = "9";
      atencion.edad_mes = "9";
      atencion.edad_dias = "9";
      atencion.fecha_atencion = Date.now();
      var newAtencion = await atencion.save({ transaction: t });

      for (const detail of req.body.diagnosticos) {
        var detailDiag = await db["his_detalle_diagnostico"].build(detail);
        detailDiag.id_atencion = newAtencion.id_atencion;
        await detailDiag.save({ transaction: t });
      }

      await t.commit();
      response.sendCreated(res, atencion);
    } catch (error) {
      await t.rollback();
      response.sendBadRequest(res, error.message);
    }
  }
  async putHojaAtencion(req, res) {
    const t = await db.sequelize.transaction();
    try {
      var hoja = await db["his_atencion"].findOne({
        where: { id_hoja_atencion: req.body.id_hoja_atencion },
      });
      if (!hoja) {
        return response.sendNotFound(
          res,
          "No existe la hoja de atención: " + req.body.id_hoja_atencion
        );
      }
      hoja = await hoja.update(req.body, {}, { transaction: t });
      t.commit();
      response.sendData(res, hoja, "Se ha actualizado correctamente");
    } catch (error) {
      t.rollback();
      response.sendBadRequest(res, error.message);
    }
  }
  async deleteHojaAtencion(req, res) {
    const t = await db.sequelize.transaction();
    var estado = "1";
    var msg = "Se ha restablecido correctamente";
    try {
      var hoja = await db["his_atencion"].findOne({
        where: { id_hoja_atencion: req.params.id },
      });
      if (!hoja) {
        return response.sendNotFound(
          res,
          "No existe la hoja de atención: " + req.body.id_hoja_atencion
        );
      }
      if (hoja.estado === "Activo") {
        estado = "0";
        msg = "Se ha eliminado correctamente";
      }
      hoja.estado = estado;
      await hoja.save({ transaction: t });
      t.commit();
      response.sendData(res, hoja, msg);
    } catch (error) {
      t.rollback();
      response.sendBadRequest(res, error.message);
    }
  }
}
module.exports = new AtencionController();
