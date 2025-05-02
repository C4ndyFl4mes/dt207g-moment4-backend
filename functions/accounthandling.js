const bcrpt = require('bcrypt');
const Account = require('../models/accounts');

/**
 * Skapar en användare och lägger till den i databasen.
 * @param {string} username - användarnamn.
 * @param {string} password - lösenord.
 * @returns felmeddelande.
 */
async function createUser(username, password) {
    try {
        const user = {
            username: username,
            password: await bcrpt.hash(password, 10),
            registrationDate: new Date().toLocaleDateString("SE-sv")
        };
        const result = await Account.create(user);
        return {valid: true, error: {message: "Lyckades lägga till ny användare.", user: result}}
    } catch (error) {
        return {valid: false, error: error};
    }
}

/**
 * Loggar in en användare.
 * @param {string} username - användarnamn
 * @param {string} password - lösenord
 * @returns felmeddelande.
 */
async function loginUser(username, password) {
    try {
        const user = await Account.findOne({username: username});
        const match = await bcrpt.compare(password, user.password);
        if (match) {
            return {valid: true, error: {message: "Inloggningen lyckades."}};
        } else {
            return {valid: false, error: {message: "Användarnamn eller lösenord är felaktigt."}};
        }
    } catch (error) {
        return {valid: false, error: error};
    }
}

module.exports = {createUser, loginUser};