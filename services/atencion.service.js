const db = require("../models/index");
class AtencionService {
    async  getAllAtencionByHoja (page, limit, id) {
        var resp =  await db["his_atencion"]
            .findAndCountAll({
                limit: 100,
                offset: page,
                include: [
                    {
                        model: db["paciente"],
  
                    },
                ],
                where: {id_hoja_atencion: id}
            })
        return resp;
    }
    async  getAllAtencionByHojaReport (page, limit, id) {
        var resp =  await db["his_atencion"]
            .findAndCountAll({
                limit: 100,
                offset: page,
                include: [
                    {model: db["paciente"], 
                        include: [
                            {model: db["maestro_his_etnia"], as: "etnia"},
                            {model: db["maestro_his_ubigeo_inei_reniec"], as: "procedencia"},
                        ]},
                    {model: db["his_detalle_diagnostico"], as: "diagnostico",
                        include: [
                            {model: db["his_lab"]},
                            /* {model: db["maestro_his_cie_cpms"]}, */
                        ]},
                    {model: db["maestro_his_financiador"], as: "financiador"},
                    {model: db["maestro_his_centro_poblado"], as : "cp_procedencia"},
                ],
                where: {id_hoja_atencion: id}
            })
        return resp;
    }
}


module.exports = new AtencionService();