// showFavourites.js
const express = require("express");
const pool = require('../../database/databaseconn');
const router = express.Router();

//fetch from favourites endpoint
router.post('/api/showfavourites', async(req, res) => {
    let { userId } = req.body;
    userId = parseInt(userId);
    if (!userId) {
        return res.json({ success: false, error: 'Something Went Wrong' });
    }
    await pool.query('SELECT * FROM favourites WHERE userid = $1', [userId], (err, row) => {
        if (err) {
            return res.json({ success: false, error: 'Database error' });
        } else if (!row || !row.rows || row.rows.length === 0) {
            return res.json({ success: false, error: 'No Saved Data' });
        } else {
            // Check if the data exists before accessing its properties
            const recipeData = row.rows[0];
            return res.json({
                success: true,
                recipe: {
                    recipeid: recipeData.recipeid,
                    recipename: recipeData.recipename,
                    recipeimage: recipeData.recipeimage
                }
            });
        }
    });
});

module.exports = router;
