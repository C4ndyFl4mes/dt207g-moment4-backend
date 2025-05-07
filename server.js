const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const { authenticateToken } = require('./functions/accounthandling');
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

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});