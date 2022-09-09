const db = require("../models/index");
const response = require("../helpers/response");
const { Op } = require("sequelize");

class usuarioController {
    /**
     * @api {get} /v1/usuario Obtener hoja de Usuario
     * @apiName GetAllUsuarios
     * @apiGroup Usuario
     * @apiHeader {String} Authorization JWT Authorization generated from /login
     * @apiParam {Number} id hoja Usuario ID.
     * @apiGroup Usuario
     *
     */

    async listar(req, res) {
        try {

            const limit = req.body.limit
            let page = req.body.page
            if (page == 1) {
                page = 0
            } else {
                page = (page - 1) * limit
            }

            await db["his_detalle_usuario"]
                .findAndCountAll({
                    limit: limit,
                    offset: page,
                    attributes: {
                        exclude: ["id_personal", "id_perfil", "id_usuario"]
                    },
                    include: [
                        {
                            model: db["t_usuario"],
                            required: false,
                            attributes: {
                                exclude: ["pass_usuario", "id_usuario"]
                            },
                        },
                        {
                            model: db["personal"],
                            required: false,
                            attributes: {
                                exclude: ["id_personal", "id_tipo_documento"]
                            },
                        },
                        {
                            model: db["perfil"],
                            required: false,
                            attributes: {
                                exclude: ["id_perfil"]
                            },
                        }
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



    async eliminar(req, res) {
        console.log(req.body);
        console.log(res);
        console.log("hola mundo");
        /* try {
            var beforeTurno = await db["his_turno"].findOne({
                where: { id_turno: req.params.id },
            });
            response.sendBadRequest(res, await beforeTurno.destroy());
            //response.sendCreated(res, newTurno);
        } catch (error) {
            response.sendBadRequest(res, error.message);
        } */
    }

    async mostarUsuario(req, res) {
        try {
            await db["his_detalle_usuario"]
                .findAll({
                    where: {
                        "$t_usuario.id_usuario$": { [Op.eq]: req.id_usuario }
                    },
                    attributes: {
                        exclude: ["id_personal", "id_perfil", "id_usuario", ""]
                    },
                    include: [
                        {
                            model: db["t_usuario"],
                            required: false,
                            attributes: {
                                exclude: ["pass_usuario", "id_usuario"]
                            },
                        },
                        {
                            model: db["personal"],
                            required: false,
                            attributes: {
                                exclude: ["id_personal", "id_tipo_documento"]
                            },
                            include: [
                                {
                                    model: db["maestro_his_establecimiento"],
                                    required: false
                                }
                            ]
                        },
                        {
                            model: db["perfil"],
                            required: false,
                            attributes: {
                                exclude: ["id_perfil"]
                            },
                        }
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
}
module.exports = new usuarioController();
