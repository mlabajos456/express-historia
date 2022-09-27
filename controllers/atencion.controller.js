const db = require("../models/index");
const response = require("../helpers/response");
const atencionService = require("../services/atencion.service");
class AtencionController {
    /**
    * @api {get} /v1/atencion/ Obtener atenciones
    * @apiGroup Atencion
    * @apiName GetAllAtenciones
    * @apiHeader {String} Authorization JWT token generated from /login
    * 
 */

    async getAllAtencion(req, res) {       
        const limit = req.body.limit
        let befPage = req.body.page
        let page = req.body.page
        if(page == 1){
            page = 0
        }else{
            page = (page -1) * limit
        } 
        try {
            atencionService.getAllAtencionByHojaReport(page, limit, req.params.id)
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
                    response.sendForbidden(res, errro);
                });
        } catch (error) {
            console.log(error)
            response.sendBadRequest(res, error
            );
        }
    }

    async getOneAtencion (req, res){
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
    }

    async postAtencion(req, res) {        
        const t = await db.sequelize.transaction();
        try {
            var atencion = await db["his_atencion"].build(req.body);
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
module.exports = new AtencionController();
