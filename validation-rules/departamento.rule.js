const BaseJoi = require("joi");
const Extension = require("joi-date-extensions");
const Joi = BaseJoi.extend(Extension);

module.exports = {
  findProvincia:{
    params:{
      codDep:Joi.string().required().label("codDep"),
    }
  },

  findDistrito:{
    params:{
      codDep:Joi.string().required().label("codDep"),
      codProv: Joi.string().required().label("codProv")
    }
  }
};