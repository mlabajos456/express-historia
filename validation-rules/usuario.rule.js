const BaseJoi = require("joi");
const Extension = require("joi-date-extensions");
const Joi = BaseJoi.extend(Extension);

module.exports = {
  create: {
    body: Joi.object().keys({
      nombre_turno: Joi.string().required().label("Nombre de turno"),
    }),
  },
  edit: {
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
  },
};
