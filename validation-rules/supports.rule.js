const BaseJoi = require("joi");
const Extension = require("joi-date-extensions");
const Joi = BaseJoi.extend(Extension);

module.exports = {
  findOne: {
    params: {
      id: Joi.string().required().label("id"),
      //codDep: Joi.string().required().label("codDep"),
      //codProv: Joi.string().required().label("codProv"),
    },
  }
};
