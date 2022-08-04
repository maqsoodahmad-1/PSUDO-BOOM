const { check, sanitizeBody } = require('express-validator');
exports.form = [
    check('first_name').trim().notEmpty().withMessage('First Name required').matches(/^[a-zA-Z]*$/).withMessage('Only characters with white spaces are allowed'),
    check('last_name').trim().notEmpty().withMessage('First Name required').matches(/^[a-zA-Z]*$/).withMessage('Only characters with white spaces are allowed'),
    check('emailAddress').notEmpty().withMessage('Email Address required').normalizeEmail().isEmail().withMessage('must be a valid email'),
    check('password').trim().notEmpty().withMessage('Password Required').isLength({ min:5 }).withMessage('password must be minimum 5 length').matches(/(?=.*?[A-Z])/).withMessage('Atleast one UpperCase').matches(/(?=.*?[a-z])/).withMessage('At least one Lowercase')
  .matches(/(?=.*?[0-9])/).withMessage('At least one Number')
  .matches(/(?=.*?[#?!@$%^&*-])/).withMessage('At least one special character')
  .not().matches(/^$|\s+/).withMessage('White space not allowed'),

    // confirm password validation
  check('confirm_password').custom((value, { req }) => {
     if (value !== req.body.password) {
             throw new Error('Password Confirmation does not match password');
        }
        return true;
   })
]