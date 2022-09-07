const db = require("../models/index");
const response = require("../helpers/response");
const { and } = require("joi/lib/types/object");
const { Op } = require("sequelize");

class SupportController {
 
  async getOneTurno(req, res) {
    try {
      await db["his_turno"]
        .findOne({
          where: { id_turno: req.params.id },
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
 /**
   * @api {get} /v1/support/turno Lista de turnos
   * @apiGroup Support
   * @apiName getAllTurnos
   * @apiHeader {String} Authorization JWT Authorization generated from /login
   *
  */
  async getAllTurnos(req, res) {
    try {
      await db["his_turno"]
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
  /**
   * @api {get} /v1/support/ups/:id Obtener UPS por id
   * @apiGroup Support
   * @apiName getOneUPS
   * @apiHeader {String} Authorization JWT Authorization generated from /login
   * @apiParam {String} id String id
   *
   */
  async getOneUPS(req, res) {
    try {
      await db["maestro_his_ups"]
        .findOne({
          where: { id: req.params.id },
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
 /**
   * @api {get} /v1/support/ups Lista de UPS
   * @apiGroup Support
   * @apiName getAllUPS
   * @apiHeader {String} Authorization JWT Authorization generated from /login
   *
  */
  async getAllUPS(req, res) {
    try {
      console.log("id_usuario: " + req.id_usuario);
      await db["maestro_his_ups"]
        .findAll({
          limit: 100,
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
  /**
   * @api {get} /v1/support/perfil/:id Obtener Perfil por id
   * @apiGroup Support
   * @apiName getOnePerfil
   * @apiHeader {String} Authorization JWT Authorization generated from /login
   * @apiParam {String} id String id
   *
   */
  async getOnePerfil(req, res) {
    try {
      await db["perfil"]
        .findOne({
          where: { id_perfil: req.params.id },
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
 /**
   * @api {get} /v1/support/perfil Lista de Perfil
   * @apiGroup Support
   * @apiName getAllPerfil
   * @apiHeader {String} Authorization JWT Authorization generated from /login
   *
  */
  async getAllPerfil(req, res) {
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
  /**
   * @api {get} /v1/support/cie/:id Obtener Cie por id
   * @apiGroup Support
   * @apiName getOneCie
   * @apiHeader {String} Authorization JWT Authorization generated from /login
   * @apiParam {String} id String id
   *
   */
  async getOneCie(req, res) {
    try {
      await db["maestro_his_cie_cpms"]
        .findOne({
          where: { id: req.params.id },
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
/**
 * @api {post} /v1/support/cie/getbyname/all Obtener Cie por query
 * @apiGroup Support
 * @apiName getByNameCie
 * @apiHeader {String} Authorization JWT Authorization generated from /login
 * @apiBody {String} q  query for filter
 */
  async getByName(req, res) {
    try {
      await db["maestro_his_cie_cpms"]
          .findAll({
            where: {
              [Op.or]: [
                {
                  codigo_item: {
                    [Op.like]: '%'+req.body.q.toUpperCase()+'%'
                  }
                },
                {
                  descripcion_item: {
                    [Op.like]: '%'+req.body.q.toUpperCase()+'%'
                  }
                }
              ]
            }
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
 /**
   * @api {get} /v1/support/cie Lista de Cie
   * @apiGroup Support
   * @apiName getAllCie
   * @apiHeader {String} Authorization JWT Authorization generated from /login
   *
  */
  async getAllCie(req, res) {
    try {
      await db["maestro_his_cie_cpms"]
        .findAll({
          limit: 100,
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
  /**
   * @api {get} /v1/support/financiador/:id Obtener Financiador por id
   * @apiGroup Support
   * @apiName getOneFinanciador
   * @apiHeader {String} Authorization JWT Authorization generated from /login
   * @apiParam {String} id String id
   *
   */
  async getOneFinanciador(req, res) {
    try {
      await db["maestro_his_financiador"]
        .findOne({
          where: { id: req.params.id },
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
/**
   * @api {get} /v1/support/financiador Lista de Financiador
   * @apiGroup Support
   * @apiName getAllFinanciador
   * @apiHeader {String} Authorization JWT Authorization generated from /login
   *
  */
  async getAllFinanciador(req, res) {
    try {
      await db["maestro_his_financiador"]
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
 /**
   * @api {get} /v1/support/centro-poblado/:id Obtener Centro Poblado por id
   * @apiGroup Support
   * @apiName getOneCentro Poblado
   * @apiHeader {String} Authorization JWT Authorization generated from /login
   * @apiParam {String} id String id
   *
   */
  async getOneCentroPoblado(req, res) {
    try {
      await db["maestro_his_centro_poblado"]
        .findOne({
          where: { id: req.params.id },
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
/**
   * @api {get} /v1/support/centro-poblado Lista de CentroPoblado
   * @apiGroup Support
   * @apiName getAllCentroPoblado
   * @apiHeader {String} Authorization JWT Authorization generated from /login
   *
  */
  async getAllCentroPoblado(req, res) {
    try {
      await db["maestro_his_centro_poblado"]
        .findAll({ limit: 10 })
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

  /* UBIGEO */
  async getAllUbigeoDepatamento(req, res) {
    try {
      var buscar = req.body.query.toUpperCase().trim();
      await db["maestro_his_ubigeo_inei_reniec"]
        .findAll({
          attributes: {
            exclude: ["provincia", "distrito", "codDist", "codProv", "id"],
          },
          group: ["departamento", "codDep"],
          where: { departamento: { [Op.like]: "%" + buscar + "%" } },
        })
        .then((val) => {
          response.sendData(res, val, "success");
        })
        .catch((errro) => {
          response.sendForbidden(res, errro.message);
        });
    } catch (error) {
      response.sendBadRequest(res, error.message);
    }
  }

  async getAllUbigeoProvincia(req, res) {
    try {
      var buscar = req.body.query.toUpperCase().trim();
      await db["maestro_his_ubigeo_inei_reniec"]
        .findAll({
          attributes: {
            exclude: ["departamento", "distrito", "codDist", "codDep", "id"],
          },
          group: ["provincia", "codProv"],
          where: {
            codDep: req.params.codDep,

            provincia: { [Op.like]: "%" + buscar + "%" },
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
  async getAllUbigeoDistrito(req, res) {
    try {
      var buscar = req.body.query.toUpperCase().trim();
      await db["maestro_his_ubigeo_inei_reniec"]
        .findAll({
          attributes: {
            exclude: ["departamento", "provincia", "codProv", "codDep", "id"],
          },
          group: ["distrito", "codDist"],
          where: {
            codDep: req.params.codDep,
            codProv: req.params.codProv,
            provincia: { [Op.like]: "%" + buscar + "%" },
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
  //findone
  async getOneUbigeoDepatamento(req, res) {
    try {
      await db["maestro_his_ubigeo_inei_reniec"]
        .findOne({
          where: { codDep: req.params.id },
          attributes: {
            exclude: ["id", "codDist", "codProv", "provincia", "distrito"],
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
  async getOneUbigeoProvincia(req, res) {
    try {
      await db["maestro_his_ubigeo_inei_reniec"]
        .findOne({
          attributes: { exclude: ["distrito", "codDist"] },
          where: { codProv: req.params.codProv, codDep: req.params.codDep },
          attributes: {
            exclude: ["id", "codDist", "codDep", "departamento", "distrito"],
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

  async getOnebigeoDistrito(req, res) {
    try {
      await db["maestro_his_ubigeo_inei_reniec"]
        .findOne({
          attributes: { exclude: ["codDep", "id", "codProv"] },
          where: {
            codDist: req.params.codDist,
            codProv: req.params.codProv,
            codDep: req.params.codDep,
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
  /* UBIGEO */
  /*IPRRES*/

  async getAllEstByUbigeo(req, res) {
    try {
      await db["maestro_his_establecimiento"]
        .findAll({
          attributes: {
            exclude: ["id"],
          },
          where: {
            ubigeo: req.body.ubigeo,
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
  /*FIN IPRESS*/
}
module.exports = new SupportController();
