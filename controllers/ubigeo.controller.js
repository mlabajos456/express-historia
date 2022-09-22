const db = require("../models/index");
const response = require("../helpers/response");


class UbigeoController {

    async redes(req, res) {
        try {
            await db["maestro_his_establecimiento"]
                .findAll({
                    attributes: [
                        ["red", "descripcion"],
                        ["codigo_red", "codigo"]
                    ],
                    where: {
                        "codigo_disa": "30"
                    },
                    raw: true,
                    nest: true,
                    group: [
                        "codigo_red",
                        "red"
                    ],
                    order: [
                        ["red", "ASC"]
                    ],
                })

                .then((val) => {
                    response.sendData(res, val, "success");
                })
                .catch((errro) => {
                    response.sendForbidden(res, errro);
                });
        } catch (error) {
            response.sendBadRequest(res, error);
        }
    }

    async microredes(req, res) {
        try {
            var codred = req.params.codred
            await db["maestro_his_establecimiento"]
                .findAll({
                    attributes: [
                        ["microred", "descripcion"],
                        ["codigo_microred", "codigo"]
                    ],
                    where: {
                        "codigo_disa": "30",
                        "codigo_red": codred
                    },
                    raw: true,
                    nest: true,
                    group: [
                        "codigo_microred",
                        "microred"
                    ],
                    order: [
                        ["microred", "ASC"]
                    ],
                })

                .then((val) => {
                    response.sendData(res, val, "success");
                })
                .catch((errro) => {
                    response.sendForbidden(res, errro);
                });
        } catch (error) {
            response.sendBadRequest(res, error);
        }
    }

    async establecimientos(req, res) {
        try {
            var codred = req.params.codred
            var codmicrored = req.params.codmicrored

            await db["maestro_his_establecimiento"]
                .findAll({
                    attributes: [
                        ["nombre_establecimiento", "descripcion"],
                        ["codigo_unico", "codigo"]
                    ],
                    where: {
                        "codigo_disa": "30",
                        "codigo_red": codred,
                        "codigo_microred": codmicrored
                    },
                    raw: true,
                    nest: true,
                    group: [
                        "codigo_unico",
                        "nombre_establecimiento"
                    ],
                    order: [
                        ["nombre_establecimiento", "ASC"]
                    ],
                })

                .then((val) => {
                    response.sendData(res, val, "success");
                })
                .catch((errro) => {
                    response.sendForbidden(res, errro);
                });
        } catch (error) {
            response.sendBadRequest(res, error);
        }
    }
}

module.exports = new UbigeoController();