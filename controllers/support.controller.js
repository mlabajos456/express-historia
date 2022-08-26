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

      console.log('id_usuario: ' + req.id_usuario);
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
     // var busccar=req.body.departamento;
      await db["maestro_his_ubigeo_inei_reniec"]
        .findAll({
          attributes: {
            exclude: ["provincia", "distrito", "codDist", "codProv"]
          },
          group:['departamento', 'codigo_departamento_inei'],
          //where:{departamento:{[Op.like]: '%'+busccar+'%'}}
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

  async getAllUbigeoProvincia(req, res) {
    try {
      await db["maestro_his_ubigeo_inei_reniec"]
        .findAll({
          limit: 10,
          attributes: { exclude: ["distrito", "codDist"] },
          //attributes: { exclude: ["codDist"]},
          where: {codDep: req.params.codDep },
          group:['departamento', 'codigo_departamento_inei','id_ubigueo_inei','provincia', 'codigo_provincia_inei']
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
      await db["maestro_his_ubigeo_inei_reniec"]
        .findAll({
          limit: 10,
          attributes: { exclude: ["codDep", "codProv"] },
          where: {codProv: req.params.codProv,  codDep: req.params.codDep}
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
  async getOneUbigeoProvincia(req, res) {
    try {
      await db["maestro_his_ubigeo_inei_reniec"]
        .findOne({
          attributes: { exclude: ["distrito", "codDist"] },
          where: { codProv: req.params.codProv, codDep: req.params.codDep },
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
            codDist: req.params.codDist, codProv: '10',
            codDep: '22'
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


  async getAllRed(req, res) {
    try {
      await db["maestro_his_establecimiento"]
        .findAll({
          limit: 10,
          attributes: {
            exclude: ["codMicroRed", "ubigeo", "microRed", "establecimiento"]
          },
          where:{codisa:'30'}
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
//filtrando las redes
  async getAllMicroRed(req, res) {
    try {
      await db["maestro_his_establecimiento"]
        .findAll({
          limit: 10,
          attributes: {
            exclude: ["codMicroRed", "codigoRed", "establecimiento"]
          },
          where: { codisa: '30',codigoRed:req.params.codigoRed}
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
  async getAllIpress(req, res) {
    try {
      await db["maestro_his_establecimiento"]
        .findAll({
          limit: 10,
          attributes: {
            exclude: ["codigoRed", "codMicroRed", "ubigeo"],
          },
          where: { codisa: '30', codigoRed: req.params.codigoRed, codMicroRed:req.params.codMicroRed}
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


  async getOneRed(req, res) {
    try {
      await db["maestro_his_establecimiento"]
        .findAll({
          limit: 10,
          attributes: {
            exclude: ["codMicroRed", "ubigeo", "microRed", "establecimiento"]
          },
          where:{id: req.params.id}
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

  async getOneMicroRed(req, res) {
    try {
      await db["maestro_his_establecimiento"]
        .findAll({
          limit: 10,
          attributes: {
            exclude: ["codMicroRed", "ubigeo", "codigoRed", "establecimiento"]
          },
          where: { codisa: '30', codigoRed: req.codigoRed }
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
  async getOneIpress(req, res) {
    try {
      await db["maestro_his_establecimiento"]
        .findAll({
          limit: 10,
          attributes: {
            exclude: ["codigoRed", "codMicroRed", "ubigeo"],
          },
          where: { ubigeo: req.params.ubigeo, codigoRed: req.codigoRed, codMicroRed: req.codMicroRed, id:req.id }
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
