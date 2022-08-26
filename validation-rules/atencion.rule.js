const BaseJoi = require("joi");
const Extension = require("joi-date-extensions");
const Joi = BaseJoi.extend(Extension);
const listaDiagnosticoEdit = Joi.object().keys({
  id_detalle: Joi.number().label("id detalle"),
  id_atencion: Joi.number().label("id atencion"),
  id_cie: Joi.string().required().label("cie 10"),
  valor_lab: Joi.string().label("valor lab"),
  diagnostico_tipo: Joi.string().required().label("tipo de diagnostico"),
});
const listaDiagnostico = Joi.object().keys({
  id_cie: Joi.string().required().label("cie 10"),
  valor_lab: Joi.string().label("valor lab"),
  diagnostico_tipo: Joi.string().required().label("tipo de diagnostico"),
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
      ficha_familiar: Joi.string().label("ficha familiar"),
      cef: Joi.string(),
      abd: Joi.string(),
      observacion: Joi.string(),
      ubigeo: Joi.string().required().label("ubigeo"),
      peso: Joi.number(),
      id_financiador: Joi.number(),
      estado_gestante: Joi.string(),
      id_centro_poblado: Joi.string().required().label("id centro poblado"),
      condicion_establec: Joi.string()
        .max(1)
        .required()
        .label("Condición establecimiento"),
      condicion_servicio: Joi.string()
        .max(1)
        .required()
        .label("Condición servicio"),
      fum: Joi.date(),
      /* fecha_atencion: Joi.date(), */
      talla: Joi.string(),
      id_paciente: Joi.number().required().label("id paciente"),
      fecha_hb: Joi.date(),
      condicion: Joi.boolean(),
      num_historia_clinica: Joi.string()
        .required()
        .label("Número de historia clinica"),
      hemoglobina: Joi.number(),
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
      ficha_familiar: Joi.string().label("ficha familiar"),
      cef: Joi.string(),
      abd: Joi.string(),
      observacion: Joi.string(),
      ubigeo: Joi.string().required().label("ubigeo"),
      peso: Joi.number(),
      id_financiador: Joi.number(),
      estado_gestante: Joi.string(),
      id_centro_poblado: Joi.string(),
      condicion_establec: Joi.string()
        .max(1)
        .required()
        .label("Condición establecimiento"),
      condicion_servicio: Joi.string()
        .max(1)
        .required()
        .label("Condición servicio"),
      fum: Joi.date(),
      fecha_atencion: Joi.date(),
      talla: Joi.string(),
      id_paciente: Joi.number(),
      fecha_hb: Joi.date(),
      condicion: Joi.boolean(),
      num_historia_clinica: Joi.string()
        .required()
        .label("Número de historia clinica"),
      hemoglobina: Joi.number(),
    }),
  },  
  findOne: {
    params: {
      id: Joi.string().required().label("id de atención"),
    },
  }, 
};
