const express = require("express");
const bcrypt = require('bcrypt');
const pool = require('../../database/databaseconn');
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
        const existingfavourites = await pool.query('SELECT * FROM favourites WHERE userid = $1', [parsedUserId]);

        if (existingfavourites.rows.length === 0 || !existingfavourites.rows[0].recipeid) {
            // User doesn't have favourites, insert a new record
            await pool.query('INSERT INTO favourites (userid, recipeid, recipename, recipeimage) VALUES ($1, $2, $3, $4)',
                [parsedUserId, recipeId, recipeName, recipeImage]);
        } else {
            // User already has favourites, check if the recipeId is already saved
            const alreadySaved = existingfavourites.rows[0].recipeid.includes(parsedRecipeId);
            if (alreadySaved) {
                res.json({ success: false, message: 'Already Saved' });
                return
            } else {
                // User already has favourites, update the existing record
                const existingRow = existingfavourites.rows[0];
                const recipeIds = (existingRow.recipeid || '') + ',' + recipeId;
                const recipeNames = (existingRow.recipename || '') + '+' + recipeName;
                const recipeImages = (existingRow.recipeimage || '') + '+' + recipeImage;
                await pool.query('UPDATE favourites SET recipeid = $1, recipename = $2, recipeimage = $3 WHERE userid = $4',
                    [recipeIds, recipeNames, recipeImages, parsedUserId]);
            }
        }

        res.json({ success: true, favourites: { userId: parsedUserId, recipeId: recipeId } });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server error' });
    }
});

module.exports = router;
