const express = require('express');
const router = express.Router();
const { checkAccountInputs, isUsernameUnique } = require('../functions/validations');
const { createUser, loginUser } = require('../functions/accounthandling');

router.post("/register", async (req, res) => {
    const { username, password } = req.body;
    const uniqueUsername = await isUsernameUnique(username);
    const check = checkAccountInputs(username, password);
    
    if (uniqueUsername.valid && check.valid) {
        const userCreation = await createUser(username, password);
        if (userCreation.valid) {
            return res.status(201).json(userCreation.error);
        } else {
            return res.status(400).json(userCreation.error);
        }
    } else {
        if (!uniqueUsername.valid) {
            return res.status(400).json(uniqueUsername.error);
        }
        if (!check.valid) {
            return res.status(400).json(check.error);
        }
    }
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const uniqueUsername = await isUsernameUnique(username);
    const check = checkAccountInputs(username, password);

    if (!uniqueUsername.valid && check.valid) {
        const loggedInUser = await loginUser(username, password);
        if (loggedInUser.valid) {
            return res.status(200).json(loggedInUser.error);
        } else {
            return res.status(401).json(loggedInUser.error);
        }
    } else {
        return res.status(401).json({message: "Användarnamn eller lösenord är felaktigt."});
    }
});

module.exports = router;