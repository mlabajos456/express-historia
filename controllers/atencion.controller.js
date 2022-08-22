const db = require("../models/index");
const response = require("../helpers/response");

class AtencionController {
  /**
   * @api {get} /v1/atencion/ Obtener lista de pacientes
   * @apiGroup Atencion
   * @apiName GetAllAtenciones
   *
   * @apiHeader {String} token JWT token generated from /login
   *
   */
  index(req, res) {
    db["his_hoja_atencion"]
      .findAll({
        include: [{ model: db["his_turno"] }],
      })
      .then((val) => {
        response.sendData(res, val, "success");
      }).catch((errro) =>{
        response.sendBadRequest(res, errro, "error");
      })

      
  }
}
module.exports = new AtencionController();
