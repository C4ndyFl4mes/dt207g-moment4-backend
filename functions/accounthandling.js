const bcrpt = require('bcrypt');
const Account = require('../models/accounts');
const jwt = require('jsonwebtoken');

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
        return { valid: true, error: { message: "Lyckades lägga till ny användare.", user: result } }
    } catch (error) {
        return { valid: false, error: error };
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
        const user = await Account.findOne({ username: username });
        const match = await bcrpt.compare(password, user.password);
        if (match) {
            const token = generateToken(user);
            return { valid: true, error: { message: "Inloggningen lyckades.", token: token } };
        } else {
            return { valid: false, error: { message: "Användarnamn eller lösenord är felaktigt." } };
        }
    } catch (error) {
        return { valid: false, error: error };
    }
}

/**
 * Genererar en token som ska användas vid anrop för en användare.
 * @param {object} user - användaren
 * @returns token.
 */
function generateToken(user) {
    const payload = {
        username: user.username,
        role: user.role,
        registrationDate: user.registrationDate
    };
    return jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '1h' });
}

/**
 * Kollar om token är giltig.
 * @param {object} req 
 * @param {object} res 
 * @param {function} next 
 * @returns felmeddelande om det är ogiltigt, annars går den bara vidare med next().
 */
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Otillåten tillgång: token saknas." });
    } else {
        jwt.verify(token, process.env.JWT_KEY, (error, user) => {
            if (error) {
                return res.status(403).json({ message: "Inkorrekt token." });
            } else {
                req.user = user;
                next();
            }
        });
    }
}
module.exports = { createUser, loginUser, authenticateToken };