const db = require("../models/index");
const response = require("../helpers/response");
const DetalleDiagnosticoController = require("./detalle-diagnostico.controller");

class AtencionController {
    /**
    * @api {get} /v1/atencion/ Obtener lista de pacientes
    * @apiGroup Atencion
    * @apiName GetAllAtenciones
    * @apiHeader {String} Authorization JWT token generated from /login
    * 
 */

    async getAllAtencion(req, res) {
        try {
            await db["his_atencion"]
                .findAll({
                    include: [
                        {
                            model: db["his_detalle_diagnostico"],
          
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
            atencion.condicion_establec = "R"
            atencion.condicion_servicio = "R"
            atencion.id_hoja_atencion = 36
            atencion.fecha_atencion = Date.now();            
            var newAtencion = await atencion.save({ transaction: t });
            for (const detail of req.body.diagnosticos) {
                detail.id_cie = detail.id_cie.id
                var detailDiag = await db["his_detalle_diagnostico"].build(detail);
                detailDiag.id_atencion = newAtencion.id_atencion;
                
                var newDetail = await detailDiag.save({ transaction: t });
                for (const lab of detail.valor_lab){
                    lab.id_detalle = newDetail.id_detalle
                    var newLab = await db["his_lab"].build(lab);
                    await newLab.save({ transaction: t });
                }
            }
            await t.commit();
            response.sendCreated(res, newAtencion);
        } catch (error) {
            await t.rollback();
            response.sendBadRequest(res, error.message);
        }
    }
    async putAtencion(req, res) {
        const t = await db.sequelize.transaction();
        try {
            var atencion = await db["his_atencion"].findOne({
                where: { id_atencion: req.body.id_atencion },
            });

            if (!atencion) {
                return response.sendNotFound(
                    res,
                    "No existe la atención: " + req.body.id_atencion
                );
            }
            atencion = await atencion.update(req.body, {}, { transaction: t });
            for (const detail of req.body.diagnosticos) {
                if (detail.id_detalle) {
                    var beforeDetail = await db["his_detalle_diagnostico"].findOne({
                        where: { id_detalle: detail.id_detalle },
                    });

                    if (!beforeDetail) {
                        response.sendNotFound(
                            res,
                            "No existe el : " + req.body.id_atencion
                        );
                        return t.rollback();
                    }

                    beforeDetail = await beforeDetail.update(
                        detail,
                        {},
                        { transaction: t }
                    );
                } else {
                    var detailDiag = await db["his_detalle_diagnostico"].build(detail);
                    detailDiag.id_atencion = atencion.id_atencion;
                    await detailDiag.save({ transaction: t });
                }
            }

            t.commit();
            response.sendData(res, atencion, "Se ha actualizado correctamente");
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
