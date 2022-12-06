const BaseJoi = require("joi");
const Extension = require("joi-date-extensions");
const Joi = BaseJoi.extend(Extension);
const cie = Joi.object().keys({
    id: Joi.string().required().label("cie 10"),
    descripcion: Joi.string().required().label("descripcion")});
const labs = Joi.object().keys({   
    descripcion: Joi.string().required().allow("").label("descripcion")});
    
const listaDiagnostico = Joi.object().keys({
    id_cie: cie,
    valor_lab: Joi.array()
        .min(1)
        .items(labs)
        .required()
        .label("lista de labs"),
    diagnostico_tipo: Joi.string().required().label("tipo de diagnostico"),
    editable: Joi.boolean().optional().label("editable"),
});
module.exports = {
    findOneAtencionPrenatal:{
        query:{           
            id_gestante:Joi.number().required().label("id gestante"),
            id_num:Joi.number().required().label("id control"),
        }
    },
    findTratamientoProcedimiento:{
        query:{           
            id_detalle:Joi.number().required().label("id detalle de diagnostico"),
        }
    },
    createAtencionPrenatal : {
        body: {
            atencion:Joi.object().keys({
                diagnosticos: Joi.array()
                    .min(1)
                    .items(listaDiagnostico)
                    .required()
                    .label("lista de diagnosticos"),
                ficha_familiar: Joi.string().optional().allow(""),
                cef: Joi.string().optional().allow(""),
                abd: Joi.string().optional().allow(""),
                observacion: Joi.string().optional().allow(""),
                ubigeo: Joi.string().required().label("ubigeo"),
                peso: Joi.number().optional().allow(""),
                id_financiador: Joi.number(),
                estado_gestante: Joi.string().optional().allow(""),
               
                condicion_establec: Joi.string()
                    .max(1)
                    .required()
                    .label("Condición establecimiento"),
                condicion_servicio: Joi.string()
                    .max(1)
                    .required()
                    .label("Condición servicio"),
                fecha_atencion: Joi.date().required().label("fecha de atencion"),
                fecha_hb: Joi.date().optional().allow(""),
                condicion: Joi.boolean(),
                
                hemoglobina: Joi.string().optional().allow(""),
                
                edad_anio: Joi.number().optional().allow(""),
                
                edad_mes: Joi.number().optional().allow(""),
                
                edad_dias: Joi.number().optional().allow(""),
            }),
            hoja_atencion: Joi.object().keys({
                id_turno: Joi.number().required().label("turno"),
                id_ups: Joi.number().required().label("ups"),
                id_responsable: Joi.number().optional().label("responsable"),
                codigo_unico_ipress: Joi.string().required().label("codigo unico")
            }),
            atencion_prenatal : Joi.object().keys({
                id_gestante: Joi.number().required().label("gestante"),
                id_num : Joi.number().required().label("número de control")
            })


        }
    },
    editAtencionPrenatal: {
        body:{ atencion:Joi.object().keys({
            id_atencion:Joi.number().required().label("id atencion"),
            id_hoja_atencion:Joi.number().required().label("id hoja atencion"),
            id_paciente: Joi.number().required().label("id paciente"),
            diagnosticos: Joi.array()
                .min(1)
                .items(listaDiagnostico)
                .required()
                .label("lista de diagnosticos"),
            ficha_familiar: Joi.string().optional().allow(""),
            cef: Joi.string().optional().allow(""),
            abd: Joi.string().optional().allow(""),
            observacion: Joi.string().optional().allow(""),
            ubigeo: Joi.string().required().label("ubigeo"),
            peso: Joi.number().optional().allow(""),
            id_financiador: Joi.number(),
            estado_gestante: Joi.string().optional().allow(""),
            id_centro_poblado:  Joi.string().optional().allow(""),
            condicion_establec: Joi.string()
                .max(1)
                .required()
                .label("Condición establecimiento"),
            condicion_servicio: Joi.string()
                .max(1)
                .required()
                .label("Condición servicio"),
            fum: Joi.string().optional().allow(""),
            fecha_atencion: Joi.date().required().label("fecha de atencion"),
            fecha_hb: Joi.date().optional().allow(""),
            condicion: Joi.boolean(),
            hemoglobina: Joi.string().optional().allow(""),
        
            edad_anio: Joi.number().optional().allow(""),
        
            edad_mes: Joi.number().optional().allow(""),
        
            edad_dias: Joi.number().optional().allow(""),
        }),
        hoja_atencion: Joi.object().keys({
            id_turno: Joi.number().required().label("turno"),
            id_ups: Joi.number().required().label("ups"),
            id_responsable: Joi.number().optional().label("responsable"),
            codigo_unico_ipress: Joi.string().required().label("codigo unico"),
            id_hoja_atencion: Joi.number().required().label("id hoja atencion")
        }),
        atencion_prenatal : Joi.object().keys({
            id_gestante: Joi.number().required().label("gestante"),
            id_num : Joi.number().required().label("número de control"),
            id_atencion: Joi.number().required().label("atencion")
        })}
    }
};