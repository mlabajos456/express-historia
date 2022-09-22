const db = require("../models/index");
const response = require("../helpers/response");


class UbigeoController {
    async RedesSanMartin(req, res) {
        try {
            /**SELECT codigo_red AS codigo, red AS nombre 
             * FROM maestro_his_establecimiento 
             * WHERE codigo_disa = '30' GROUP BY codigo_red, red ORDER BY red */
            await db["maestro_his_establecimiento"]
                .findAll({
                    attributes: [
                        [ "red" , "descripcion"],
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
}

module.exports = new UbigeoController();