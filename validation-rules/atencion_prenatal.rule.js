const BaseJoi = require("joi");
const Extension = require("joi-date-extensions");
const Joi = BaseJoi.extend(Extension);

module.exports = {
    findOneAtencionPrenatal:{
        query:{
            id_atencion:Joi.number().required().label("id atencion"),
            id_gestante:Joi.number().required().label("id gestante"),
            id_num:Joi.number().required().label("id control"),
        }
    },
};