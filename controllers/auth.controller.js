const jwt = require("jsonwebtoken");
const { privateKey, tokenExpireInSeconds } = require("../config/config");
const db = require("../models/index");
const bcrypt = require("bcrypt");
const response = require("../helpers/response");
const { Op } = require("sequelize");


async function authenticate(req, res) {
    const data = await db["his_detalle_usuario"].findOne({
        where: {
            '$t_usuario.nom_usuario$': { [Op.eq]: req.body.usuario },
            estado : 't'
        },
        include: [
            {
                model: db["t_usuario"],
                required: true
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

    if (!data) {
        response.sendUnauthorized(res, "Authentication failed.");
        return;
    }
    const hash = data.t_usuario.pass_usuario.replace("$2y$", "$2a$");
    const result = bcrypt.compareSync(req.body.clave, hash);

    if (result == false) {
        response.sendUnauthorized(res, "Authentication failed.");
        return;
    }

  res.json({
    success: true,
    message: "Token created.",
    token: 'bearer '+jwt.sign(
      {
        id: data.id_usuario,
      },
      privateKey,
      {
        expiresIn: tokenExpireInSeconds,
      }
    ),
  });
    res.json({
        success: true,
        message: "Token created.",
        token: jwt.sign(
            {
                id: data.id_usuario,
            },
            privateKey,
            {
                expiresIn: tokenExpireInSeconds,
            }
        ),
    });
}

module.exports = {
    authenticate,
};
