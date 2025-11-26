const express = require('express');
const router = express.Router();
const {
    getAllUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/users');
const {
    getAllProducts,
    getOneProduct,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/products');
const {
    userValidationRules,
    productValidationRules,
    validate
} = require('../middleware/validator');
const passport = require('passport');
const { isAuthenticated } = require('../middleware/authenticate');

// authenication routes
router.get('/auth/github/login', passport.authenticate('github'));

router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.session.destroy();
        res.redirect('/');
    });
});

// contact routes
router.get('/users', getAllUsers);
router.get('/users/:id', getOneUser);
router.post('/users', isAuthenticated, userValidationRules(), validate, createUser);
router.put('/users/:id', isAuthenticated, userValidationRules(), validate, updateUser);
router.delete('/users/:id', isAuthenticated, deleteUser);

// product routes
router.get('/products', getAllProducts);
router.get('/products/:id', getOneProduct);
router.post('/products', isAuthenticated, productValidationRules(), validate, createProduct);
router.put('/products/:id', isAuthenticated, productValidationRules(), validate, updateProduct);
router.delete('/products/:id', isAuthenticated, deleteProduct);

module.exports = router;
