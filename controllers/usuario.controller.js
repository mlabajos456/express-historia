const db = require("../models/index");
const response = require("../helpers/response");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");

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

    async list(req, res) {
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

    async created(req, res) {
        const transc = await db.sequelize.transaction();

        try {
            var personal = await db["his_detalle_usuario"].findOne({
                where: { id_personal: req.body.id_personal },
                raw: true,
                include: [
                    {
                        model: db["t_usuario"],
                        required: false,
                        attributes: {
                            exclude: ["pass_usuario"]
                        },
                    }
                ],
            });
            console.log(personal);
            if (personal) {
                //return response.sendBadRequest(res, "Personal ya registrado")
                //REGISTAR EN his_detalle_usuario

                console.log("REGISTAR EN his_detalle_usuario");
            } else {
                //OBTENER MAX ID_USUARIO
                const idMaxUsuario = await db["t_usuario"].max("id_usuario")
                const id_usuario = idMaxUsuario + 1;
                //ENCRIPTAR CONTRASEÑA
                const salt = await bcrypt.genSaltSync(10);
                const password = req.body.password
                const newPassword = (await bcrypt.hashSync(password, salt)).replace("$2b$", "$2y$");

                //CREAR USUARIO t_usuario
                await db["t_usuario"].create({
                    id_usuario: id_usuario,
                    pass_usuario: newPassword,
                    nom_usuario: req.body.nom_usuario,
                    nom_empleado: req.body.nom_empleado,
                    dni: req.body.dni,
                    email: req.body.email,
                    profesion: req.body.profesion,
                    telefono: req.body.telefono,
                    fecha_acceso_termina: req.body.fecha_acceso,
                    estado_usuario: req.body.estado
                }).then(data => {
                    //REGISTAR EN his_detalle_usuario
                    
                    response.sendData(res, data, "success");
                }).catch(function () {
                    res.json({ "status": "error" })
                    response.sendBadRequest(res, "Error inisperado");
                })
            }

            /* 
            const savebody = await db["his_detalle_usuario"].build(req.body);
            await savebody.save({ transaction: transc })
                .then(function (item) {
                    response.sendCreated(res, item.id_detalle_usuario, "Datos guardados correctamente.");
                }).catch(function (err) {
                    response.sendBadRequest(res, err.message);
                });
            await transc.commit(); */

        } catch (error) {
            await transc.rollback();
            response.sendBadRequest(res, error.message);
        }
    }

    /*  readated(req, res) {

    }

    updated(req, res) {

    } */

    async deleted(req, res) {
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
    async buscarListPersonal(req, res) {
        try {
            await db["personal"]
                .findAll({
                    where: {
                        "numero_documento": { [Op.eq]: req.body.dni }
                    },
                    attributes: {
                        exclude: ["id_tipo_documento"]
                    },
                    include: [db["maestro_his_establecimiento"]]
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
