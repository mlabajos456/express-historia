const Joi = require("joi");

module.exports = (options) => {
    return (req, res, next) => {
        let result = null;
        if (options.header) {
            result = Joi.validate(req.header, options.header);
        }

        if (options.body) {
            result = Joi.validate(req.body, options.body);
            
        }
        if(options.params){
            result = Joi.validate(req.params, options.params);
        }
        if(options.query){
            result = Joi.validate(req.query, options.query);
        }
        if (result.error === null) {
            return next();
        }

        res.status(400).send({
            error: result.error.details.map((err) => err.message),
        });
    };
};
