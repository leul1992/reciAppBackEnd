// showFavourites.js
import express from "express";
import pool from '../../database/databaseconn.js';

const router = express.Router();

// Fetch from favourites endpoint
router.post('/api/showfavourites', async (req, res) => {
    try {
        let { userId } = req.body;
        userId = parseInt(userId);
        if (!userId) {
            return res.json({ success: false, error: 'Something Went Wrong' });
        }

        const { rows } = await pool.query('SELECT * FROM favourites WHERE userid = $1', [userId]);
        if (rows.length === 0) {
            return res.json({ success: false, error: 'No Saved Data' });
        } else {
            const recipeData = rows[0];
            return res.json({
                success: true,
                recipe: {
                    recipeid: recipeData.recipeid,
                    recipename: recipeData.recipename,
                    recipeimage: recipeData.recipeimage
                }
            });
        }
    } catch (err) {
        return res.json({ success: false, error: 'Database error' });
    }
});

export default router;
