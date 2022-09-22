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
                    ]
                })

                .then((val) => {
                    //console.log(val);
                    response.sendData(res, val, "success");
                })
                .catch((errro) => {
                    console.log(errro);
                    response.sendForbidden(res, errro);
                });
        } catch (error) {
            response.sendBadRequest(res, error);
        }
    }

    async microredes(req, res) {
        try {
            var codred = req.params.codred
            /**
             * SELECT codigo_microred AS codigo, microred AS nombre FROM maestro_his_establecimiento 
             * WHERE codigo_disa = '30' AND codigo_red = '$codigo'
        GROUP BY codigo_microred, microred ORDER BY microred;
             */
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
                    ]
                })

                .then((val) => {
                    //console.log(val);
                    response.sendData(res, val, "success");
                })
                .catch((errro) => {
                    console.log(errro);
                    response.sendForbidden(res, errro);
                });
        } catch (error) {
            response.sendBadRequest(res, error);
        }
    }
}

module.exports = new UbigeoController();