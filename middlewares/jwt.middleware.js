const jwt = require("jsonwebtoken");
const { privateKey } = require("../config/config");
const response = require("../helpers/response");
const db = require("../models/index");
const { Op } = require("sequelize");

module.exports = (req, res, next) => {
    if (req.method === "OPTIONS") {
        return next();
    }
    const token = req.headers.authorization;

    if (typeof token === "undefined") {
        response.sendUnauthorized(res, "Access denied.");
        return;
    }

    const bearer = token.split(" ");
    jwt.verify(bearer[1], privateKey, async (err, decoded) => {
        if (err) {
            return response.sendForbidden(res, "Invalid token.");
        }
        // set request with decoded token so next middlewares can use it
        // req.id_usuario = decoded.id;

        const data = await db["his_detalle_usuario"].findOne({
            where: {
                '$t_usuario.id_usuario$': { [Op.eq]: decoded.id},
                estado : 't'
            },
            include: [
                {
                    model: db["t_usuario"],
                    required: true,
                    attributes: {
                        exclude: ['pass_usuario']
                    },
                },
                {
                    model: db["personal"],
                    required: false
                },
                {
                    model: db["perfil"],
                    required: false,
                }
            ],
        });

        if (data == null) {
            return response.sendUnauthorized(res, "Access denied.");
        }
        req.detalle_usuario = data.id_detalle_usuario;
        req.id_usuario = data.id_usuario;
        req.id_personal = data.id_personal;
        req.id_perfil = data.id_perfil;
        req.nom_usuario = data.t_usuario.nom_usuario;
        req.dni = data.t_usuario.dni;
        req.dni = data.t_usuario.estado_usuario;
        next();
    });
};
