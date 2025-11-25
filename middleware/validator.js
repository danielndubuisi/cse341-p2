const { check, validationResult } = require('express-validator');
const userValidationRules = () => {
    return [
        // email must be an email and required
        check('email')
            .notEmpty()
            .withMessage('must provide an email')
            .isEmail()
            .withMessage('must be a valid email'),
        // firstname is required
        check('firstName').notEmpty().withMessage('must provide a first name'),
        // lastname is required
        check('lastName').notEmpty().withMessage('must provide a last name'),
        // firstname must be greater than 0 and required
        check('age')
            .notEmpty()
            .withMessage('must provide an age')
            .isInt({ min: 0 })
            .withMessage('age must be greater than 0')
    ];
};
const productValidationRules = () => {
    return [
        // product is required to have a name
        check('name').notEmpty().withMessage('provide product name'),
        // product category is required
        check('category').notEmpty().withMessage('must set a category'),
        // price must be greater than 0 and required (allow decimals)
        check('price')
            .notEmpty()
            .withMessage('must provide a price')
            .isFloat({ min: 0.01 })
            .withMessage('product price must be greater than 0')
    ];
};
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors = [];
    errors.array().map((err) => extractedErrors.push({ [err.path]: err.msg }));

    return res.status(422).json({
        errors: extractedErrors
    });
};

module.exports = {
    userValidationRules,
    productValidationRules,
    validate
};
