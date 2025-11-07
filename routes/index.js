const express = require("express");
const router = express.Router();
const { getAllContacts, getOneContact } = require("../controllers/contacts");


//index route
router.get("/", (req, res) => {
    res.json({
        message: "Hello World!",
    });
});

// // contact routes
router.get("/contacts", getAllContacts);
router.get("/contacts/:id", getOneContact);

module.exports = router;
