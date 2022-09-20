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
                            {model: db["maestro_his_etnia"]},
                        ]},
                    {model: db["his_detalle_diagnostico"]},
                    {model: db["maestro_his_financiador"]}
                ],
                where: {id_hoja_atencion: id}
            })
        return resp;
    }
}


module.exports = new AtencionService();