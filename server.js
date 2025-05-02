const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();


const app = express();
connectDB();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


// Routes
app.use("/api", authRoutes);


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});