const Joi = require('@hapi/joi');

//Sign up validation
const registerValidation =(data)=>{
    
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        surname: Joi.string().required(),
        email: Joi.string().min(3).required().email(),
        image: Joi.string(),
        username: Joi.string().required(),
        password: Joi.string().min(4).required()
    })

     return schema.validate(data);
};

//Login registerValidation
const loginValidation =(data)=>{
    
    const schema = Joi.object({      
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    })

     return schema.validate(data);
};


module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;

