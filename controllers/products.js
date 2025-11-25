const { getDb } = require('../db/connect');
const { ObjectId } = require('mongodb');

//get all contacts
const getAllProducts = async (req, res) => {
    try {
        await getDb()
            .db('cse341-p2')
            .collection('products')
            .find()
            .toArray()
            .then((products) => {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(products);
            });
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

//get one contact
const getOneProduct = async (req, res) => {
    // Validate the id
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid user id.');
    }
    // Create a new ObjectId
    const productId = new ObjectId(req.params.id);
    // Fetch the user from the database
    try {
        await getDb()
            .db('cse341-p2')
            .collection('products')
            .find({ _id: productId })
            .toArray()
            .then((products) => {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(products[0]);
            });
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

//create new contact
const createProduct = async (req, res) => {
    const newProduct = {
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        inStock: req.body.inStock
    };
    // Insert the new user into the database
    try {
        const result = await getDb().db('cse341-p2').collection('products').insertOne(newProduct);
        if (result.acknowledged) {
            res.status(201).json(result._id);
        } else {
            res.status(500).json(result.error || 'Error creating new product');
        }
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

// update one contact
const updateProduct = async (req, res) => {
    // Validate the id
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid user id.');
    }
    // Create a new ObjectId
    const productId = new ObjectId(req.params.id);
    // Create the updated user object
    const updatedProduct = {
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        inStock: req.body.inStock
    };
    // Update the user in the database
    try {
        const result = await getDb()
            .db('cse341-p2')
            .collection('products')
            .replaceOne({ _id: productId }, updatedProduct);
        if (result.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json(result.error || 'Error updating product');
        }
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

//delete one contact
const deleteProduct = async (req, res) => {
    // Validate the id
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid user id.');
    }
    // Create a new ObjectId
    const productId = new ObjectId(req.params.id);
    // Delete the user from the database
    try {
        const result = await getDb()
            .db('cse341-p2')
            .collection('products')
            .deleteOne({ _id: productId });
        if (result.acknowledged) {
            res.status(200).send();
        } else {
            res.status(500).json(result.error || 'Error deleting product');
        }
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

module.exports = { getAllProducts, getOneProduct, createProduct, updateProduct, deleteProduct };
