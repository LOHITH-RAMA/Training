const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) throw err;
    console.log("MySQL Connected!");
});

// API Route to Get Restaurants
app.get('/restaurants', (req, res) => {
    db.query("SELECT * FROM restaurants", (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

const PORT = process.env.PORT || 5000; 

app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
