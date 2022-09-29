const db = require("../../models/index");
class AtencionService {
    async getOneGestante (id) {
        var resp =  await db["gestante_doc"]
            .findOne({
                where: {id_gestante: id},
                include: [
                    {model:db["paciente"]}
                ]
                /* include: [
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
                ], */
            })
        return resp;
    }
}


module.exports = new AtencionService();