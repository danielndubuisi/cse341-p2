const { getDb } = require('../db/connect');
const { ObjectId } = require('mongodb');

//get all contacts
const getAllUsers = async (req, res) => {
    const result = await getDb().db('cse341-p2').collection('users').find();

    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    });
};

//get one contact
const getOneUser = async (req, res) => {
    const userId = req.params.id;
    const result = await getDb()
        .db('cse341-p2')
        .collection('users')
        .find({ _id: new ObjectId(userId) });
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users[0]);
    });
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
        createdAt: req.body.createdAt,
        address: {
            street: req.body.address.street,
            city: req.body.address.city,
            state: req.body.address.state,
            zip: req.body.address.zip
        }
    };

    const result = await getDb().db('cse341-p2').collection('users').insertOne(newUser);
    if (result.acknowledged) {
        res.status(201).json(result._id);
    } else {
        res.status(500).json(result.error || 'Error creating new user');
    }
};

// update one contact
const updateUser = async (req, res) => {
    const userId = req.params.id;
    const updatedUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        age: req.body.age,
        isActive: req.body.isActive,
        role: req.body.role,
        createdAt: req.body.createdAt,
        address: {
            street: req.body.address.street,
            city: req.body.address.city,
            state: req.body.address.state,
            zip: req.body.address.zip
        }
    };
    const result = await getDb()
        .db('cse341-p2')
        .collection('users')
        .replaceOne({ _id: new ObjectId(userId) }, updatedUser);
    if (result.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || 'Error updating user');
    }
};

//delete one contact
const deleteUser = async (req, res) => {
    const contactId = req.params.id;
    const result = await getDb()
        .db('cse341-p2')
        .collection('contacts')
        .deleteOne({ _id: new ObjectId(contactId) });
    if (result.acknowledged) {
        res.status(200).send();
    } else {
        res.status(500).json(result.error || 'Error deleting contact');
    }
};

module.exports = { getAllUsers, getOneUser, createUser, updateUser, deleteUser };
