var Joi = require("joi");

module.exports = {
    login: {
        body : Joi.object().keys({
            email: Joi.string().required().label("Email address"),
            password: Joi.string().required().label("Password"),
        })
    }
};