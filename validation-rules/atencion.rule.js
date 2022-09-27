const BaseJoi = require("joi");
const Extension = require("joi-date-extensions");
const Joi = BaseJoi.extend(Extension);
const cie = Joi.object().keys({
    id: Joi.string().required().label("cie 10"),
    descripcion: Joi.string().required().label("descripcion")});

const labs = Joi.object().keys({   
    descripcion: Joi.string().required().allow("").label("descripcion")});

const editLabs = Joi.object().keys({   
    id_lab : Joi.number().required().label("id_lab"),
    descripcion: Joi.string().required().allow("").label("descripcion")});

const listaDiagnosticoEdit = Joi.object().keys({
    id_detalle: Joi.number().label("id detalle"),
    valor_lab: Joi.array()
        .min(1)
        .items(editLabs)
        .required()
        .label("lista de labs"),
    diagnostico_tipo: Joi.string().required().label("tipo de diagnostico"),
    editable: Joi.boolean().optional().label("editable"),
});
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
    create: {
        body: Joi.object().keys({
            id_hoja_atencion: Joi.number().required().label("id hoja de atención"),
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
            peso: Joi.string().optional().allow(""),
            id_financiador: Joi.number(),
            estado_gestante: Joi.string().optional().allow(""),
            id_centro_poblado:  Joi.string().optional().allow(""),
            condicion_establec: Joi.string()
                .max(10)
                .required()
                .label("Condición establecimiento"),
            condicion_servicio: Joi.string()
                .max(10)
                .required()
                .label("Condición servicio"),
            fum: Joi.string().optional().allow(""),
            fecha_atencion: Joi.date(),
            talla: Joi.string().optional().allow(""),
            id_paciente: Joi.number().required().label("id paciente"),
            fecha_hb: Joi.date().optional().allow(""),
            condicion: Joi.boolean(),
            num_historia_clinica: Joi.string()
                .required()
                .label("Número de historia clinica"),
            hemoglobina: Joi.number().optional(),
            
            edad_anio: Joi.number().optional().allow(""),
            
            edad_mes: Joi.number().optional().allow(""),
            
            edad_dias: Joi.number().optional().allow(""),
        }),
    },
    edit: {
        body: Joi.object().keys({
            id_atencion: Joi.number().required().label("id atencion"),
            id_hoja_atencion: Joi.number().required().label("id hoja de atención"),
            diagnosticos: Joi.array()
                .min(1)
                .items(listaDiagnosticoEdit)
                .required()
                .label("lista de diagnosticos"),
            ficha_familiar: Joi.string().optional().allow(""),
            cef: Joi.string().optional().allow(""),
            abd: Joi.string().optional().allow(""),
            observacion: Joi.string().optional().allow(""),
            ubigeo: Joi.string().required().label("ubigeo"),
            peso: Joi.string().optional().allow(""),
            id_financiador: Joi.number(),
            estado_gestante: Joi.string().optional().allow(""),
            id_centro_poblado:  Joi.string().optional().allow(""),
            condicion_establec: Joi.string()
                .max(10)
                .required()
                .label("Condición establecimiento"),
            condicion_servicio: Joi.string()
                .max(10)
                .required()
                .label("Condición servicio"),
            fum: Joi.string().optional().allow(""),
            fecha_atencion: Joi.date(),
            talla: Joi.string().optional().allow(""),
            id_paciente: Joi.number().required().label("id paciente"),
            fecha_hb: Joi.date().optional().allow(""),
            condicion: Joi.boolean(),
            num_historia_clinica: Joi.string()
                .required()
                .label("Número de historia clinica"),
            hemoglobina: Joi.number().optional(),
        }),
    },  
    findOne: {
        params: {
            id: Joi.string().required().label("id de atención"),
        },
    }, 
};
