// signup.js
import express from "express";
import bcrypt from 'bcrypt';
import pool from '../../database/databaseconn.js';

const router = express.Router();

// Signup endpoint
router.post('/api/signup', async (req, res) => {
    console.log('signup endpoint')
    const { username, password, repassword } = req.body;

    if (!username || !password || !repassword) {
        return res.json({ success: false, error: 'Missing fields' });
    }

    if (password !== repassword) {
        return res.json({ success: false, error: 'Password must match' });
    }

    try {
        // Check if a user with the same username already exists
        const { rows } = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

        if (rows.length > 0) {
            return res.json({ success: false, error: 'Username already taken' });
        }

        // If username is not taken, proceed to create a new user
        const hashedPassword = await bcrypt.hash(password, 10);

        await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, hashedPassword]);

        return res.json({ success: true, user: { username } });
    } catch (error) {
        return res.json({ success: false, error: 'Error creating user' });
    }
});

export default router;
