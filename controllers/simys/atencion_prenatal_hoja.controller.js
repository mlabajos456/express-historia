const db = require("../../models/index");
const response = require("../../helpers/response");
const utils = require("../../helpers/utils");
const atencionPrenatalService = require("../../services/simys/atencion_prenatal_hoja.service");
const gestanteService = require("../../services/simys/gestante.service");
const hojaAtencionService = require("../../services/hoja-atencion.service");
const atencionService = require("../../services/atencion.service");
class AtencionPrenatalController {
    /**
    * @api {get} /v1/atencion/ Obtener atenciones
    * @apiGroup Atencion
    * @apiName GetAllAtenciones
    * @apiHeader {String} Authorization JWT token generated from /login
    * 
 */
    async getOneAtencionPrenatal(req, res) {
        let id_gestante = req.query.id_gestante;
        let id_num = req.query.id_num;
        try {
            atencionPrenatalService.getOneAtencionPrenatal(id_gestante, id_num).then((val) => {
                response.sendData(res, val, "success");
            }).catch((err) => {
                console.log(err)
                response.sendBadRequest(res, err.message);
            });
        } catch (error) {
            console.log(error)
            response.sendBadRequest(res, error
            );
        }
    }
    async postAtencionPrenatal(req, res) {
        const t = await db.sequelize.transaction();
        let newAtencion = req.body.atencion;
        let newHojaAtencion = req.body.hoja_atencion;
        let gestante = await gestanteService.getOneGestante(req.body.atencion_prenatal.id_gestante)
        let atencionPrenatal = req.body.atencion_prenatal;
        try {
            let detalleAtencionPrenatal = await atencionPrenatalService.getOneAtencionPrenatal(atencionPrenatal.id_gestante, atencionPrenatal.id_num)
            if (!detalleAtencionPrenatal) {
                /* se crea la hoja */
                var newHojaCreated = await hojaAtencionService.postHojaAtencion(t, newHojaAtencion);
                /* se modela la atencion para posteriormente guardar */
                var atencion = await db["his_atencion"].build(newAtencion);
                atencion.id_hoja_atencion = newHojaCreated.id_hoja_atencion;
                atencion.fum = gestante.fur
                atencion.talla = gestante.gest_talla
                atencion.id_centro_poblado = gestante.id_centro_poblado
                atencion.num_historia_clinica = gestante.documento
                /*  atencion.fecha_atencion = Date.now();  */
                let fnacimiento = gestante.paciente.f_nacimiento.split("-")
                try {
                    let edad = utils.ageCalculator(fnacimiento[1] + "/" + fnacimiento[0] + "/" + fnacimiento[2], newAtencion.fecha_atencion)
                    atencion.edad_anio = edad.years
                    atencion.edad_mes = edad.months
                    atencion.edad_dias = edad.days
                } catch (error) {
                    atencion.edad_anio = ""
                    atencion.edad_mes = ""
                    atencion.edad_dias = ""
                }
                atencion.id_paciente = gestante.paciente.id
                var newAtencionCreated = await atencion.save({ transaction: t });
                /* se registra el detalle de la atencion prenatal */
                atencionPrenatal.id_atencion = newAtencionCreated.id_atencion;
                await atencionPrenatalService.postAtencionPrenatal(t, atencionPrenatal)
                /* se registra los diagnoticos de la atencion */
                for (const detail of newAtencion.diagnosticos) {
                    detail.id_cie = detail.id_cie.id
                    var detailDiag = await db["his_detalle_diagnostico"].build(detail);
                    detailDiag.id_atencion = newAtencionCreated.id_atencion;
                    /* se registra los valores lab de los diagnosticos */
                    var newDetail = await detailDiag.save({ transaction: t });
                    for (const lab of detail.valor_lab) {
                        lab.id_detalle = newDetail.id_detalle
                        var newLab = await db["his_lab"].build(lab);
                        await newLab.save({ transaction: t });
                    }
                    /* se registra los tratamientos de los diagnosticos */
                    if (detail.tratamientos.length > 0) {
                        for (const tratamiento of detail.tratamientos) {
                            tratamiento.id_detalle = newDetail.id_detalle
                            var newTratamiento = await db["his_tratamiento_diagnostico"].build(tratamiento);
                            await newTratamiento.save({ transaction: t });
                        }
                    }
                }
                await t.commit();
                response.sendCreated(res, req.body);
            } else {
                req.body.atencion_prenatal.id_atencion = detalleAtencionPrenatal.id_atencion
                req.body.hoja_atencion.id_hoja_atencion = detalleAtencionPrenatal.his_atencion.his_hoja_atencion.id_hoja_atencion
                req.body.atencion.id_atencion = detalleAtencionPrenatal.id_atencion
                req.body.atencion.id_hoja_atencion = detalleAtencionPrenatal.his_atencion.his_hoja_atencion.id_hoja_atencion
                new AtencionPrenatalController().putAtencionPrenatal(req, res)
            }




        } catch (error) {
            await t.rollback();
            response.sendBadRequest(res, error.message);
        }
    }
    async putAtencionPrenatal(req, res) {
        const t = await db.sequelize.transaction();
        try {
            let atencion = await atencionService.getOneAtencion(req.body.atencion.id_atencion)
            if (!atencion) {
                return response.sendNotFound(
                    res,
                    "No existe la atención: " + req.body.atencion.id_atencion
                );
            }
            for (const diag of atencion.diagnosticos) {
                await db["his_lab"].destroy({
                    where: { id_detalle: diag.id_detalle },
                    transaction: t
                })
                await db["his_tratamiento_diagnostico"].destroy({
                    where: { id_detalle: diag.id_detalle },
                    transaction: t
                })
            }
            await db["his_detalle_diagnostico"].destroy({
                where: { id_atencion: atencion.id_atencion }, transaction: t
            },)
            atencion = await atencion.update(req.body.atencion, {}, { transaction: t });
            for (const detail of req.body.atencion.diagnosticos) {
                detail.id_cie = detail.id_cie.id
                var detailDiag = await db["his_detalle_diagnostico"].build(detail);
                detailDiag.id_atencion = atencion.id_atencion;
                let newDetail = await detailDiag.save({ transaction: t });
                for (const lab of detail.valor_lab) {
                    lab.id_detalle = newDetail.id_detalle
                    var newLab = await db["his_lab"].build(lab);
                    await newLab.save({ transaction: t });
                }
                if (detail.tratamientos.length > 0) {
                    for (const tratamiento of detail.tratamientos) {
                        tratamiento.id_detalle = newDetail.id_detalle
                        var newTratamiento = await db["his_tratamiento_diagnostico"].build(tratamiento);
                        await newTratamiento.save({ transaction: t });
                    }
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
