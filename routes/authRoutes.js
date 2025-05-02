const express = require('express');
const router = express.Router();
const Account = require('../models/accounts');

router.post("/register", async (req, res) => {
    const accounts = await Account.find();
    return res.json(accounts);
});

router.post("/login", async (req, res) => {
    return res.json({message: "Login works!"});
});

module.exports = router;