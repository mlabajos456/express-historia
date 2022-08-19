const { sequelize, Sequelize } = require("../db");
const AtencionModel = require("../models/atencion.model");
const response = require("../helpers/response");
/**
 * @api {get} /v1/atencion/ Get all atenciones list
 * @apiGroup Atencion
 * @apiName GetAllAtenciones
 *
 * @apiHeader {String} token JWT token geneated from /login
 *
 */
async function index(req, res) {

  const Atencion = AtencionModel(sequelize, Sequelize);
  const data = await Atencion.findAll({
    offset: 5, 
    limit: 5,
    order: [
      ['id_paciente', 'DESC']
    ],
  })

  response.sendData(res, {
    data: data
  }, 'success')
}

module.exports = {
  index
}
