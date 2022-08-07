const express = require('express');
const router = express.Router();
const userController=require('../user-controller.js/user-controller');
const validationRule= require('../middlewares/validation-rule');

router.get('/validate-form', userController.userForm);
router.post('/validate-form',validationRule.form, userController.validateForm);

module.exports = router;
