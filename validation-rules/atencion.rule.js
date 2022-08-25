const BaseJoi = require("joi");
const Extension = require("joi-date-extensions");
const Joi = BaseJoi.extend(Extension);
const listaDiagnostico = Joi.object().keys({
  valor_lab: Joi.string().required().label("valor lab"),
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
      id_centro_poblado: Joi.string(),
      condicion_establec: Joi.string()
        .max(2)
        .required()
        .label("Condición establecimiento"),
      condicion_servicio: Joi.string()
        .max(2)
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
  /*  edit: {
    body: Joi.object().keys({
      nombre_turno: Joi.string().required().label("Nombre de turno"),
      id_turno: Joi.number().required().label("Ingrese un id de turno válido"),
    }),
  },
  delete: {
    body: Joi.object().keys({
      id_turno: Joi.number().required().label("Ingrese un id de turno válido"),
    }),
  },
  findOne: {
    params: {
      id: Joi.string().required().label("id de atención"),
    },
  }, */
};
