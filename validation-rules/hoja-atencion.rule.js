const BaseJoi = require("joi");
const Extension = require("joi-date-extensions");
const Joi = BaseJoi.extend(Extension);

module.exports = {
  create: {
    body: Joi.object().keys({
      id_turno: Joi.number().required().label("id turno"),
      id_responsable: Joi.number().required().label("id responsable"),
      fecha_apertura: Joi.date(),
      fecha_cierre: Joi.date(),
      fecha: Joi.date(),
      codigo_unico_ipress: Joi.string().required().label("código ipress"),
      id_ups: Joi.string().required().label("código ups"),
    }),
  },
  edit: {
    body: Joi.object().keys({
      id_hoja_atencion: Joi.number()
        .required()
        .label("id de la hoja de atención"),
      id_turno: Joi.number().required().label("id turno"),
      id_responsable: Joi.number().required().label("id responsable"),
      fecha_apertura: Joi.date(),
      fecha_cierre: Joi.date(),
      fecha: Joi.date(),
      codigo_unico_ipress: Joi.string().required().label("código ipress"),
      id_ups: Joi.string().required().label("código ups"),
    }),
  },
  findOne: {
    params: {
      id: Joi.string().required().label("id de la hoja de atención"),
    },
  },
  createObservation: {
    body: {
      id: Joi.string().required().label("id de la hoja de atención"),
      id_digitador: Joi.number().required().label("id digitador"),
      nombre_digitador: Joi.string().required().label("nombre del digitador"),
      observacion_digitador: Joi.string()
        .required()
        .label("observacion del digitador"),
    },
  },
};
