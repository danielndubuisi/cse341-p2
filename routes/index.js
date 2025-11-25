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

//index route
router.get('/', (req, res) => {
    res.json({
        message: 'Hello World!'
    });
});

// contact routes
router.get('/users', getAllUsers);
router.get('/users/:id', getOneUser);
router.post('/users', userValidationRules(), validate, createUser);
router.put('/users/:id', userValidationRules(), validate, updateUser);
router.delete('/users/:id', deleteUser);

// product routes
router.get('/products', getAllProducts);
router.get('/products/:id', getOneProduct);
router.post('/products', productValidationRules(), validate, createProduct);
router.put('/products/:id', productValidationRules(), validate, updateProduct);
router.delete('/products/:id', deleteProduct);

module.exports = router;
