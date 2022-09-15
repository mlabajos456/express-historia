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
                    {
                        model: db["paciente"],
                      
  
                    },
                    {model: db["his_detalle_diagnostico"]}
                ],
                where: {id_hoja_atencion: id}
            })
        return resp;
    }
}


module.exports = new AtencionService();