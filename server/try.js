const express = require("express");
const bcrypt = require('bcrypt');
const db = require('../database/databaseconn');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// Create users table if it doesn't exist
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, email TEXT, password TEXT)");
});

// Signup endpoint
app.post('/api/signup', (req, res) => {
    const { username, email, password, repassword } = req.body;

    if (!username || !email || !password) {
        return res.json({success: false, error: 'Missing fields'});
    }

    if (password !== repassword) {
        return res.json({success: false, error: 'Password must match'});
    }

    // Check if username or email already exists
    db.get('SELECT * FROM users WHERE username = ? OR email = ?', [username, email], (err, row) => {
        if (err) {
            return res.json({ success: false, error: 'Database error'});
        } else if (row) {
            // User already exists
            return res.json({ success: false, error: 'Username or email already exists'});
        }
        

        // Hash the password with a salt of 10 rounds
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                return res.json({ success: false, error: 'Error creating user'});
            }

            // Insert the new user into the database
            db.run('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hash], (err) => {
                if (err) {
                    return res.json({ success: false, error: 'Error creating user'});
                }

                // Return the newly created user
                return res.json({ success: true, user: { username, email }});
            });
        });
   
    });
});

// Login endpoint
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.json({success: false, error: 'Missing information'});
    }

    db.get('SELECT * FROM users WHERE username = ?', username, (err, row) => {
        if (err) {
            return res.json({ success: false, error: 'Database error'});
        } else if (!row) {
            return res.json({ success: false, error: 'Login Attempt Failed'});
        }

        bcrypt.compare(password, row.password, (err, result) => {
            if (err) {
                return res.json({ success: false, error: 'Database error'});
            } else if (result) {
                return res.json({ success: true, user: { id: row.id, username: row.username, email: row.email }});
            } else {
                return res.json({ success: false, error: 'Login Attempt Failed'});
            }
        });
    });
});



// Start the server
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

// Close the database connection when the process is terminated
process.on('SIGINT', () => {
    db.close();
});
