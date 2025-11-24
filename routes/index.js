const express = require('express');
const router = express.Router();
const {
    getAllUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/users');
const { userValidationRules, validate } = require('../middleware/validator');

//index route
router.get('/', (req, res) => {
    res.json({
        message: 'Hello World!'
    });
});

// // contact routes
router.get('/users', getAllUsers);
router.get('/users/:id', getOneUser);
router.post('/users', userValidationRules(), validate, createUser);
router.put('/users/:id', userValidationRules(), validate, updateUser);
router.delete('/users/:id', deleteUser);

module.exports = router;
