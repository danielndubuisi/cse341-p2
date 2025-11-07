const { getDb } = require("../db/connect");
const { ObjectId } = require("mongodb");

//get all contacts
const getAllContacts = async (req, res) => {
    const result = await getDb().db("cse341").collection("contacts").find();

    result.toArray().then((contacts) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(contacts);
    });
};

//get one contact
const getOneContact = async (req, res) => {
    const contactId = req.params.id;
    const result = await getDb()
        .db("cse341")
        .collection("contacts")
        .find({ _id: new ObjectId(contactId) });
    result.toArray().then((contacts) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(contacts[0]);
    });
};

module.exports = { getAllContacts, getOneContact };
