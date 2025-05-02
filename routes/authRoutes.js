const express = require('express');
const router = express.Router();

router.post("/register", async (req, res) => {
    return res.json({message: "Register works!"});
});

router.post("/login", async (req, res) => {
    return res.json({message: "Login works!"});
});

module.exports = router;