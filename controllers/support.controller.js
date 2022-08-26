const db = require("../models/index");
const response = require("../helpers/response");
const { and } = require("joi/lib/types/object");
const { Op } = require("sequelize");

class SupportController {
  /**
   * @api {get} /v1/support/ Obtener lista de pacientes
   * @apiGroup Atencion
   * @apiName GetAllAtenciones
   * @apiHeader {String} token JWT token generated from /login
   *
   */

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
