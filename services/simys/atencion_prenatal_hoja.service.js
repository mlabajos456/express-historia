const db = require("../../models/index");
class AtencionService {
    async  getOneAtencionPrenatal ( id_gestante, id_num) {
        var resp =  await db["his_atencion_prenatal_hoja"]
            .findOne({
                where : { id_gestante: id_gestante, id_num: id_num},
                include: [
                    {model: db["his_atencion"],
                        include: [{model: db["paciente"], 
                            include: [
                                {model: db["maestro_his_etnia"], as: "etnia"},
                                {model: db["maestro_his_ubigeo_inei_reniec"], as: "procedencia"},
                            ]},
                        {model: db["his_detalle_diagnostico"], as: "diagnosticos",
                            include: [
                                {model: db["his_lab"]},
                                {model: db["maestro_his_cie_cpms"],as :"cie"},
                            ]},
                        {model: db["maestro_his_financiador"], as: "financiador"},
                        {model: db["maestro_his_centro_poblado"], as : "cp_procedencia"},]
                    }
                ]
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
                    {model: db["his_detalle_diagnostico"], as: "diagnosticos",
                        include: [
                            {model: db["his_lab"]},
                            {model: db["maestro_his_cie_cpms"],as :"cie"},
                        ]},
                    {model: db["maestro_his_financiador"], as: "financiador"},
                    {model: db["maestro_his_centro_poblado"], as : "cp_procedencia"},
                ],
                where: {id_hoja_atencion: id}
            })
        return resp;
    }

    async getOneAtencion (id) {
        var resp =  await db["his_atencion"]
            .findOne({
                where: {id_atencion: id},
                include: [
                    {model: db["paciente"], 
                        include: [
                            {model: db["maestro_his_etnia"], as: "etnia"},
                            {model: db["maestro_his_ubigeo_inei_reniec"], as: "procedencia"},
                        ]},
                    {model: db["his_detalle_diagnostico"], as: "diagnosticos",
                        include: [
                            {model: db["his_lab"]},
                            {model: db["maestro_his_cie_cpms"],as :"cie"},
                        ]},
                    {model: db["maestro_his_financiador"], as: "financiador"},
                    {model: db["maestro_his_centro_poblado"], as : "cp_procedencia"},
                ],
            })
        return resp;
    }
    async postAtencionPrenatal (transaction, atencionPrenatal){
        var atencionPrenatalComplete = await db["his_atencion_prenatal_hoja"].build(atencionPrenatal);
        await atencionPrenatalComplete.save({ transaction: transaction });
        return atencionPrenatalComplete;
    }  
}


module.exports = new AtencionService();