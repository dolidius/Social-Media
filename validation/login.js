const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginForm(data){
    let errors = {};

    data.login = !isEmpty(data.login) ? data.login : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    
    if(validator.isEmpty(data.login)){
        errors.login = "Login field is required";
    }

    if(validator.isEmpty(data.password)){
        errors.password = "Password field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }

}