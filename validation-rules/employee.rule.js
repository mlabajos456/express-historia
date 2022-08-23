const BaseJoi = require("joi");
const Extension = require("joi-date-extensions");
const Joi = BaseJoi.extend(Extension);

module.exports = {
  create: {
    body: Joi.object().keys({
      nombre: Joi.string().required().label("Nombre de turno"),
    }),
  },
};
