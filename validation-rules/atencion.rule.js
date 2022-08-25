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
      diagnosticos: Joi.array().min(1).items(listaDiagnostico).required().label("lista de diagnosticos"),
      ficha_familiar: Joi.string().label("id hoja de atención"),
      ficha_familiar: Joi.string().required().label("id hoja de atención"),


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
