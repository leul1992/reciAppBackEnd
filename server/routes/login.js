// login.js
const express = require("express");
const bcrypt = require('bcrypt');
const pool = require('../../database/databaseconn');
const router = express.Router();

// Login endpoint
router.post('/api/login', async(req, res) => {
    const { password, username } = req.body;

    if (!username || !password) {
        return res.json({success: false, error: 'Missing information'});
    }
    const result = await pool.query('SELECT * FROM users WHERE username=$1', [username]);
    await pool.query('SELECT username, password, id FROM users WHERE username=$1', [username], (err, row) => {
        if (err) {
            return res.json({ success: false, error: 'Database error'});
        } else if (!row) {
            return res.json({ success: false, error: 'Login Attempt Failed'});
        }
        bcrypt.compare(password, row.rows[0].password, (err, result) => {
            if (err) {
                return res.json({ success: false, error: 'Database error'});
            } else if (result) {
                return res.json({ success: true, user: { id: row.rows[0].id, username: row.rows[0].username }});
            } else {
                return res.json({ success: false, error: 'Login Attempt Failed'});
            }
        });
    });
});


module.exports = router;
