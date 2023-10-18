// signup.js
const express = require("express");
const bcrypt = require('bcrypt');
const pool = require('../../database/databaseconn');
const router = express.Router();

// Signup endpoint
router.post('/api/signup', async (req, res) => {
    // Check if a user with the same username already exists
    const { username, password, repassword } = req.body;

    if (!username || !password || !repassword) {
        return res.json({ success: false, error: 'Missing fields' });
    }

    if (password !== repassword) {
        return res.json({ success: false, error: 'Password must match' });
    }

    // Query the database to check for existing users with the same username
    pool.query('SELECT * FROM users WHERE username = $1', [username], (err, result) => {
        if (err) {
            return res.json({ success: false, error: 'Error checking for existing user' });
        }

        if (result.rows.length > 0) {
            return res.json({ success: false, error: 'Username already taken' });
        }

        // If username is not taken, proceed to create a new user
        bcrypt.hash(password, 10, async (err, hash) => {
            if (err) {
                return res.json({ success: false, error: 'Error creating user' });
            }

            // Insert the new user into the database
            await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, hash], (err) => {
                if (err) {
                    return res.json({ success: false, error: 'Error creating user' });
                }

                return res.json({ success: true, user: { username } });
            });
        });
    });
});

module.exports = router;
