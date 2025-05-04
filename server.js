const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const jwt = require('jsonwebtoken');
const authRoutes = require('./routes/authRoutes');
const fs = require('fs');
const path = require('path');
require('dotenv').config();


const app = express();
connectDB();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


// Routes
app.use("/api", authRoutes);


app.get("/api/terraria_bosses", authenticateToken, (req, res) => {
    const filePath = path.join(__dirname, 'terraria_bosses.json');

    fs.readFile(filePath, "utf8", (error, data) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ message: "Misslyckades att läsa data." });
        }
        try {
            const jsonData = JSON.parse(data);
            return res.status(200).json({
                user: req.user, terraria_bosses: jsonData
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Otillåten JSON format" });
        }
    });
});

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

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});