const BaseJoi = require("joi");
const Extension = require("joi-date-extensions");
const Joi = BaseJoi.extend(Extension);

module.exports = {
    findOne: {
        params: {
            id: Joi.string().required().label("id"),
        },
    },

    findUbigeoCentroPoblado: {
        body: {
            ubigeo: Joi.string().required().label("Codigo Ubigeo")
        },
    },

    findByName: {
        body: {
            q: Joi.string().allow(""),
            limit: Joi.number().required().label("limite"),
            page: Joi.number().required().label("pagina"),
        },
    },
};
