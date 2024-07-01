// login.js
import express from "express";
import bcrypt from 'bcrypt';
import pool from '../../database/databaseconn.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('server running just testing');
})

// Login endpoint
router.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.json({ success: false, error: 'Missing information' });
    }

    try {
        const { rows } = await pool.query('SELECT id, username, password FROM users WHERE username = $1', [username]);

        if (rows.length === 0) {
            return res.json({ success: false, error: 'Login Attempt Failed' });
        }

        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            return res.json({ success: true, user: { id: user.id, username: user.username } });
        } else {
            return res.json({ success: false, error: 'Login Attempt Failed' });
        }
    } catch (err) {
        return res.json({ success: false, error: 'Database error' });
    }
});

export default router;
