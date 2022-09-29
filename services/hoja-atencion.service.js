const db = require("../models/index");
class HojaAtencionService {
    async  getOneHojaAtencion (id) {
        var resp =   await db["his_hoja_atencion"]
            .findOne({                   
                where:{id_hoja_atencion: id,},
                include: [
                    { model: db["his_turno"] },
                    { model: db["maestro_his_establecimiento"], as:"establecimiento"},                      
                    { model: db["maestro_his_ups"], as : "ups"},
                    { model: db["personal"]}
                ],
            })
        return resp;
    }

    async postHojaAtencion (transaction, atencion){
        var hojaComplete = await db["his_hoja_atencion"].build(atencion);
        hojaComplete.fecha = Date.now();
        hojaComplete.fecha_apertura = Date.now();
        hojaComplete.id_responsable = atencion.id_responsable
        await hojaComplete.save({ transaction: transaction });
        return hojaComplete;
    }
    async findOneHojaAtencion(id){
        return db["his_hoja_atencion"].findOne({
            where: { id_hoja_atencion: id },
        });

    }
   
}


module.exports = new HojaAtencionService();