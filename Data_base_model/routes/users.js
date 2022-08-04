var express = require('express');
var router = express.Router();
const userController = require('../middlewares/validation-rule')

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
// router.get('/validate-form', userController.userForm);
// router.post('/validate-form',validationRule.form, userController.validateForm);

module.exports = router;
