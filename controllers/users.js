const { getDb } = require('../db/connect');
const { ObjectId } = require('mongodb');

//get all contacts
const getAllUsers = async (req, res) => {
    try {
        await getDb()
            .db('cse341-p2')
            .collection('users')
            .find()
            .toArray()
            .then((users) => {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(users);
            });
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

//get one contact
const getOneUser = async (req, res) => {
    // Validate the id
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid user id.');
    }
    // Create a new ObjectId
    const userId = new ObjectId(req.params.id);
    // Fetch the user from the database
    try {
        await getDb()
            .db('cse341-p2')
            .collection('users')
            .find({ _id: userId })
            .toArray()
            .then((users) => {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(users[0]);
            });
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

//create new contact
const createUser = async (req, res) => {
    const newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        age: req.body.age,
        isActive: req.body.isActive,
        role: req.body.role,
        address: {
            street: req.body.address.street,
            city: req.body.address.city,
            state: req.body.address.state,
            zip: req.body.address.zip
        }
    };
    // Insert the new user into the database
    try {
        const result = await getDb().db('cse341-p2').collection('users').insertOne(newUser);
        if (result.acknowledged) {
            res.status(201).json(result._id);
        } else {
            res.status(500).json(result.error || 'Error creating new user');
        }
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

// update one contact
const updateUser = async (req, res) => {
    // Validate the id
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid user id.');
    }
    // Create a new ObjectId
    const userId = new ObjectId(req.params.id);
    // Create the updated user object
    const updatedUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        age: req.body.age,
        isActive: req.body.isActive,
        role: req.body.role,
        address: {
            street: req.body.address.street,
            city: req.body.address.city,
            state: req.body.address.state,
            zip: req.body.address.zip
        }
    };
    // Update the user in the database
    try {
        const result = await getDb()
            .db('cse341-p2')
            .collection('users')
            .replaceOne({ _id: userId }, updatedUser);
        if (result.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json(result.error || 'Error updating user');
        }
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

//delete one contact
const deleteUser = async (req, res) => {
    // Validate the id
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid user id.');
    }
    // Create a new ObjectId
    const userId = new ObjectId(req.params.id);
    // Delete the user from the database
    try {
        const result = await getDb().db('cse341-p2').collection('users').deleteOne({ _id: userId });
        if (result.acknowledged) {
            res.status(200).send();
        } else {
            res.status(500).json(result.error || 'Error deleting contact');
        }
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

module.exports = { getAllUsers, getOneUser, createUser, updateUser, deleteUser };
