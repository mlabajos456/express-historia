const db = require("../../models/index");
const response = require("../../helpers/response");
const atencionPrenatalService = require("../../services/simys/atencion_prenatal_hoja.service");
const gestanteService = require("../../services/simys/gestante.service");
const hojaAtencionService = require("../../services/hoja-atencion.service");
class AtencionPrenatalController {
    /**
    * @api {get} /v1/atencion/ Obtener atenciones
    * @apiGroup Atencion
    * @apiName GetAllAtenciones
    * @apiHeader {String} Authorization JWT token generated from /login
    * 
 */

    async getOneAtencionPrenatal(req, res) {
        let id_atencion = req.query.id_atencion;
        let id_gestante = req.query.id_gestante;
        let id_num = req.query.id_num; 
        try {
           
            atencionPrenatalService.getOneAtencionPrenatal(id_atencion,id_gestante,id_num).then((val) => {
                response.sendData(res, val, "success");
            }).catch((err) => {
                response.sendBadRequest(res, err.message);
            });
        } catch (error) {
            response.sendBadRequest(res, error
            );
        }
    }

    /*  async getOneAtencion (req, res){
        try {
            atencionService.getOneAtencion(req.params.id)
                .then((val) => {
                    response.sendData(res, val, "success");
                })
                .catch((errro) => {
                    console.log(errro)
                    response.sendForbidden(res, errro);
                });
        } catch (error) {
            console.log(error)
            response.sendBadRequest(res, error
            );
        }
    } */

    async postAtencionPrenatal(req, res) {        
        const t = await db.sequelize.transaction();
        /* crear hoja */
        let newAtencion = req.body.atencion;
        let newHojaAtencion = req.body.hoja_atencion;
        let gestante = await gestanteService.getOneGestante(req.body.id_gestante)

        try {
            var newHojaCreated = hojaAtencionService.postHojaAtencion(t,newHojaAtencion);
            var atencion = await db["his_atencion"].build(newAtencion);
            atencion.id_hoja_atencion = newHojaCreated.id_hoja_atencion;
            atencion.fecha_atencion = Date.now();            
            atencion.id_paciente = gestante.paciente.id
            var newAtencionCreated = await atencion.save({ transaction: t });
            for (const detail of newAtencion.diagnosticos) {
                detail.id_cie = detail.id_cie.id
                var detailDiag = await db["his_detalle_diagnostico"].build(detail);
                detailDiag.id_atencion = newAtencionCreated.id_atencion;
                
                var newDetail = await detailDiag.save({ transaction: t });
                for (const lab of detail.valor_lab){
                    lab.id_detalle = newDetail.id_detalle
                    var newLab = await db["his_lab"].build(lab);
                    await newLab.save({ transaction: t });
                }
            }
            await t.commit();
            response.sendCreated(res, newAtencionCreated);
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
    async deleteAtencion(req, res) {
        const t = await db.sequelize.transaction();
        var estado = true;
        var msg = "Se ha restablecido correctamente";
        try {
            var hoja = await db["his_atencion"].findOne({
                where: { id_atencion: req.params.id },
            });
            if (!hoja) {
                return response.sendNotFound(
                    res,
                    "No existe la atención: " + req.body.id_hoja_atencion
                );
            }
            if (hoja.estado === true) {
                estado = false;
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
module.exports = new AtencionPrenatalController();
