const db = require("../models/index");
const response = require("../helpers/response");

class AtencionController {
  /**
   * @api {get} /v1/atencion/ Obtener lista de pacientes
   * @apiGroup Atencion
   * @apiName GetAllAtenciones
   * @apiContentType application/json
   * @apiHeader {String} token JWT token generated from /login
   *
   */

  getAtencion(req, res) {
    db["his_hoja_atencion"]
      .findAll({
        include: [{ model: db["his_turno"] }, { model: db["t_usuario"] }],
      })
      .then((val) => {
        response.sendData(res, val, "success");
      })
      .catch((errro) => {
        console.log(errro);
        response.sendForbidden(res, errro);
      });
  }

  postAtencion(req, res) {
    console.log("hola")
    response.sendForbidden(res, "errro");
    /* insert atencionModel*/
 /*    db["his_hoja_atencion"].create({}); */
  }
}
module.exports = new AtencionController();
