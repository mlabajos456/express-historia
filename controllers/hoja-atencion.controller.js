const db = require("../models/index");
const response = require("../helpers/response");
/* const { Op } = require("sequelize"); */
class HojaAtencionController {
    /**
   * @api {get} /v1/atencion/hoja-atencion/:id Obtener hoja de atencion
   * @apiName GetAllAtenciones
   * @apiGroup Atencion
   * @apiHeader {String} Authorization JWT Authorization generated from /login
   * @apiParam {Number} id hoja atencion ID.
   * @apiGroup Atencion
   *
   */

    async getAllHojaAtencion(req, res) {
        const limit = req.body.limit
        let befPage = req.body.page
        let page = req.body.page
        if(page == 1){
            page = 0
        }else{
            page = (page -1) * limit
        }
        /*  const buscar = req.body.query */
        try {
            await db["his_hoja_atencion"]
                .findAndCountAll({
                    order: [["id_hoja_atencion", "DESC"]],
                    limit: limit,
                    offset: page,
                    /*  where: {
                        provincia: { [Op.like]: "%" + buscar + "%" }, 
                    }, */
                    include: [
                        { model: db["his_turno"] },                      
                        { model: db["maestro_his_establecimiento"], as:"establecimiento" },                      
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
        console.log(req.params)
        try {
            await db["his_hoja_atencion"]
                .findAll({
                    /*  order: [["id_turno", "ASC"]], */
                    /*  limit: 10,
          offset: 0, */
                    /*   where:{id_turno: 1,}, */

                    include: [
                        { model: db["his_turno"] },
                        // {
                        //   model: db["t_usuario"],
                        //   attributes: { exclude: ["pass_usuario"] },
                        //   as: "responsable",
                        // },
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

    async postHojaAtencion(req, res) {
        const t = await db.sequelize.transaction();
        try {            
            var hojaComplete = await db["his_hoja_atencion"].build(req.body);
            hojaComplete.fecha = Date.now();
            hojaComplete.fecha_apertura = Date.now();
            hojaComplete.id_responsable= req.id_personal
            await hojaComplete.save({ transaction: t });
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
            var hoja = await db["his_hoja_atencion"].findOne({
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
