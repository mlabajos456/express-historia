const jwt = require("jsonwebtoken");
const { privateKey, tokenExpireInSeconds } = require("../config/config");
const db = require("../models/index");
const bcrypt = require("bcrypt");
const response = require("../helpers/response");

/**
 * @api {post} /v1/auth/login Generate JWT token
 * @apiGroup Auth
 * @apiName Login
 *
 * @apiContentType application/json
 *
 * @apiParam {String} usuario Usuario: dires
 * @apiParam {String} clave Contraseña:12342022*dD
 */

async function authenticate(req, res) {
  const data = await db["t_usuario"].findOne({
    where: { nom_usuario: req.body.usuario },
  });

  if (data === null) {
    response.sendUnauthorized(res, "Authentication failed.");
    return;
  }
  const hash = data.pass_usuario.replace("$2y$", "$2a$");
  const result = bcrypt.compareSync(req.body.clave, hash);

  if (result == false) {
    response.sendUnauthorized(res, "Authentication failed.");
    return;
  }

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
