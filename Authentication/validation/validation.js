var passwordValidator = require('password-validator')
var passwordValidation = new passwordValidator();

passwordValidation
.is().min(8)
.is().max(30)
.has().uppercase()
.has().lowercase()
.has().digits()
.has().not().spaces()
.is().not().oneOf(['password','Password123']);
module.exports = passwordValidation;