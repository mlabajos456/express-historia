const jwt = require("jsonwebtoken");
const { privateKey, tokenExpireInSeconds } = require("../../config/config");
const db = require("../../models/index");
const bcrypt = require("bcrypt");
const response = require("../../helpers/response");
const { Op } = require("sequelize");

/**
    * @api {post} /v1/auth/login/ Obtener token
    * @apiGroup Auth
    * @apiName GetToken
    * @apiBody {String} usuario       Optional Firstname of the User.
    * @apiBody {String} clave          Mandatory Lastname.
    * @apiParamExample {json} Request-Example:
    *     {
    *       "usuario": "dires",
    *       "clave": "12342022*dD"
    *     }
*/
async function authenticate(req, res) {
    const data = await db["t_usuario"].findOne({
        where: {
            nom_usuario: { [Op.eq]: req.body.usuario },
            estado_usuario: "1"
        }
    });

    if (!data) {
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
        token: "Bearer " + jwt.sign(
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
