const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterForm(data){
    let errors = {};

    data.login = !isEmpty(data.login) ? data.login : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    
    if(validator.isEmpty(data.login)){
        errors.login = "Login field is required";
    }

    if(!validator.isEmail(data.email)){
        errors.email = "Invalid email";
    }

    if(validator.isEmpty(data.email)){
        errors.email = "Email field is required";
    }

    if(!validator.isLength(data.password,{min: 5, max: 30})){
        errors.password = "Password must be between 5 and 30 characters"
    }

    if(validator.isEmpty(data.password)){
        errors.password = "Password field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }

}