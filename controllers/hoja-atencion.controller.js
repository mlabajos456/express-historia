const db = require("../models/index");
const response = require("../helpers/response");

const hojaAtencionService = require("../services/hoja-atencion.service");

/* const { Op } = require("sequelize"); */
class HojaAtencionController {
    /**
   * @api {get} /v1/hoja-atencion/all Obtener Hoja de atencion
   * @apiName GetAllHojaAtenciones
   * @apiGroup Atencion
   * @apiHeader {String} Authorization JWT Authorization generated from /login
   * @apiGroup Atencion
   * @apiBody {String} mes String mes
   * @apiBody {String} anio String anio
   * @apiBody {String} id_turno String id_turno
   * @apiBody {String} id_ups String id_ups
   * @apiParamExample {json} Request-Example:
   *     {
   *       "mes": "dires",
   *       "anio": "12342022*dD",
   *       "id_turno": 1,
   *       "id_ups": 1,
   *     }
   *
*/
    async getAllHojaAtencion(req, res) {
        const limit = req.body.limit
        let befPage = req.body.page
        let page = req.body.page
        let params = []
        if (req.body.mes) {
            params.push(db.sequelize.where(db.sequelize.fn("date_part", "month", db.sequelize.col("fecha_apertura")), req.body.mes))
        }
        if (req.body.anio) {
            params.push({ anio: req.body.anio })
        }
        if (req.body.id_turno) {
            params.push({ id_turno: req.body.id_turno })
        }
        if (req.body.id_ups) {
            params.push({ id_ups: req.body.id_ups })
        }
        if (page == 1) {
            page = 0
        } else {
            page = (page - 1) * limit
        }

        try {
            await db["his_hoja_atencion"]
                .findAndCountAll({
                    order: [["id_hoja_atencion", "DESC"]],
                    limit: limit,
                    offset: page,
                    where:
                        //db.sequelize.where(db.sequelize.fn('EXTRACT(MONTH from "fecha_apertura") =', 8))
                        //get month from fecha
                        params
                    ,
                    include: [
                        { model: db["his_turno"] },
                        { model: db["maestro_his_establecimiento"], as: "establecimiento" },
                        { model: db["maestro_his_ups"], as: "ups" },
                    ],
                })
                .then((val) => {
                    const data = {
                        "page": befPage,
                        "limit": limit,
                        "total": val.count,
                        "data": val.rows
                    }
                    response.sendData(res, data, "success");
                })
                .catch((errro) => {
                    response.sendForbidden(res, errro.message);
                });
        } catch (error) {
            response.sendBadRequest(res, error.message);
        }
    }
    async getOneHojaAtencion(req, res) {

        try {
            hojaAtencionService.getOneHojaAtencion(req.params.id)
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

    async postHojaAtencion(req, res) {
        const t = await db.sequelize.transaction();
        try {
            let hojaComplete = await hojaAtencionService.postHojaAtencion(t, req.body)
            await t.commit();
            response.sendCreated(res, hojaComplete, "success");
        } catch (error) {
            await t.rollback();
            response.sendBadRequest(res, error.message);
        }
    }
    async putHojaAtencion(req, res) {
        const t = await db.sequelize.transaction();
        try {
            var hoja = await hojaAtencionService.findOneHojaAtencion(req.body.id_hoja_atencion);
            if (!hoja) {
                return response.sendNotFound(
                    res,
                    "No existe la hoja de atención: " + req.body.id_hoja_atencion
                );
            }
            hoja = await hoja.update(req.body, {}, { transaction: t });
            t.commit();
            response.sendCreated(res, hoja, "success");
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
            var hoja = await db["his_hoja_atencion"].findOne({
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
module.exports = new HojaAtencionController();
