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

    async crear(req, res) {
        const transc = await db.sequelize.transaction();
        try {

            var personal = await db["his_detalle_usuario"].findOne({ where: { id_personal: req.body.id_personal } })
            if (personal) {
                return response.sendBadRequest(res, "Personal ya registrado")
            }

            const savebody = await db["his_detalle_usuario"].build(req.body);
            await savebody.save({ transaction: transc })
                .then(function (item) {
                    response.sendCreated(res, item.id_detalle_usuario, "Datos guardados correctamente.");
                }).catch(function (err) {
                    response.sendBadRequest(res, err.message);
                });
            await transc.commit();

        } catch (error) {
            await transc.rollback();
            response.sendBadRequest(res, error.message);
        }
    }

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
                    order: [
                        ["id_detalle_usuario", "DESC"]
                    ],
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
        try {
            await db["his_detalle_usuario"].findOne({
                where: { id_detalle_usuario: req.params.id },
            }).then(function (beforeTurno) {
                beforeTurno.destroy();
            }).then(() => {
                response.sendData(res, "Registro eliminado correctamente.");
            });

        } catch (error) {
            response.sendBadRequest(res, error.message);
        }
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

    async listarPerfiles(req, res) {
        try {
            await db["perfil"]
                .findAll()
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

    async buscarPersonal(req, res) {
        try {
            await db["personal"]
                .findOne({
                    where: {
                        "numero_documento": { [Op.eq]: req.body.dni }
                    },
                    attributes: {
                        exclude: ["id_tipo_documento"]
                    },
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
