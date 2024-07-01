// saveFavourites.js
import express from "express";
import pool from '../../database/databaseconn.js';

const router = express.Router();

// Save to favourites endpoint
router.post('/api/saveFavourites', async (req, res) => {
    try {
        const { userId, recipeId, recipeName, recipeImage } = req.body;
        const parsedUserId = parseInt(userId);
        const parsedRecipeId = parseInt(recipeId);

        if (!parsedUserId || !parsedRecipeId) {
            throw new Error('Invalid user or recipe data');
        }

        // Check if the user already has favourites
        const { rows } = await pool.query('SELECT * FROM favourites WHERE userid = $1', [parsedUserId]);

        if (rows.length === 0 || !rows[0].recipeid) {
            // User doesn't have favourites, insert a new record
            await pool.query('INSERT INTO favourites (userid, recipeid, recipename, recipeimage) VALUES ($1, $2, $3, $4)',
                [parsedUserId, recipeId, recipeName, recipeImage]);
        } else {
            // User already has favourites, check if the recipeId is already saved
            const existingRow = rows[0];
            const recipeIds = existingRow.recipeid.split(',');
            if (recipeIds.includes(String(parsedRecipeId))) {
                return res.json({ success: false, message: 'Already Saved' });
            } else {
                // User already has favourites, update the existing record
                const newRecipeIds = [...recipeIds, recipeId].join(',');
                const newRecipeNames = (existingRow.recipename || '') + '+' + recipeName;
                const newRecipeImages = (existingRow.recipeimage || '') + '+' + recipeImage;
                await pool.query('UPDATE favourites SET recipeid = $1, recipename = $2, recipeimage = $3 WHERE userid = $4',
                    [newRecipeIds, newRecipeNames, newRecipeImages, parsedUserId]);
            }
        }

        res.json({ success: true, favourites: { userId: parsedUserId, recipeId: recipeId } });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server error' });
    }
});

export default router;
