const db = require("../models/index");
class HojaAtencionService {
    async  getOneHojaAtencion (id) {
        var resp =   await db["his_hoja_atencion"]
            .findOne({                   
                where:{id_hoja_atencion: id,},
                include: [
                    { model: db["his_turno"] },
             
                ],
            })
        return resp;
    }
   
}


module.exports = new HojaAtencionService();