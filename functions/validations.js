const Account = require('../models/accounts');

/**
 * Kollar om användarnamnet är av korrekt karaktär.
 * @param {string} value - användarnamn
 * @returns - felmeddelanden.
 */
function checkUsername(value) {
    const errors = [];
    if (value) {
        if (value.length < 2) {
            errors.push("minst två tecken");
        }
        if (value.length > 32) {
            errors.push("max 32 tecken");
        }
        if (/[!@#$%^&*]/.test(value)) {
            errors.push("inga special tecken (!@#$%^&*)");
        }
    } else {
        return { valid: false, error: `Användarnamnet måste vara ifyllt.` };
    }
    
    if (errors.length > 0) {
        return { valid: false, error: `Användarnamnet: ${errors.join(", ")}.` };
    } else {
        return { valid: true, error: ``};
    }
}

/**
 * Kollar om lösenordet är av korrekt karaktär.
 * @param {string} value - lösenordet
 * @returns - felmeddelanden.
 */
function checkPassword(value) {
    const errors = [];
    if (value) {
        if (value.length < 16) {
            errors.push("minst 16 tecken");
        }
        if (!/[A-Z]/.test(value)) {
            errors.push("minst en versal");
        }
        if (!/[a-z]/.test(value)) {
            errors.push("minst en gemen");
        }
        if (!/[!@#$%^&*]/.test(value)) {
            errors.push("minst ett specielt tecken (!@#$%^&*)");
        }
    } else {
        return { valid: false, error: `Lösenordet måste vara ifyllt.` };
    }
    
    if (errors.length > 0) {
        return { valid: false, error: `Lösenordet: ${errors.join(", ")}.` };
    } else {
        return { valid: true, error: ``};
    }
}

/**
 * Kollar om användarnamn är unikt.
 * @param {string} username - användarnamn
 * @returns ett felmeddelande.
 */
async function isUsernameUnique(username) {
    const exists = await Account.exists({username: username});
    if (exists) {
        return {valid: false, error: "Användarnamnet är upptaget."};
    } else {
        return {valid: true, error: ""};
    }
    
}

/**
 * Kollar inmatningsfälten.
 * @param {string} username - användarnamn
 * @param {string} password - lösenord
 * @returns - felmeddelande om vad för inmatningsfel det är.
 */
function checkAccountInputs(username, password) {
    const error = {
        valid: true,
        error: {}
    };
   
    if (!checkUsername(username).valid) {
        error.valid = false;
        error.error.username = checkUsername(username).error;
    }
    if (!checkPassword(password).valid) {
        error.valid = false;
        error.error.password = checkPassword(password).error;
    }

    return error;
}


module.exports = {checkAccountInputs, isUsernameUnique};