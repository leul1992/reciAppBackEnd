// deleteFromFavourites.js
import express from "express";
import pool from '../../database/databaseconn.js';

const router = express.Router();

// Delete from favourites endpoint
router.post('/api/deleteFromFavourites', async (req, res) => {
    try {
        let { userId, recipeId } = req.body;
        userId = parseInt(userId);
        recipeId = parseInt(recipeId);

        if (!userId || !recipeId) {
            return res.json({ success: false, error: 'Missing information' });
        }

        const { rows } = await pool.query('SELECT * FROM favourites WHERE userid = $1', [userId]);
        if (rows.length === 0) {
            return res.json({ success: false, error: 'No favourites found for this user' });
        }

        const row = rows[0];
        let idarr = String(row.recipeid).split(',');
        let namearr = row.recipename.split('+');
        let imagearr = row.recipeimage.split('+');

        const index = idarr.indexOf(String(recipeId));
        if (index !== -1) {
            if (idarr.length === 1) {
                await pool.query('DELETE FROM favourites WHERE id=$1', [row.id]);
                return res.json({ success: true, message: 'Recipe removed from favourites' });
            }
            idarr.splice(index, 1);
            namearr.splice(index, 1);
            imagearr.splice(index, 1);

            // Rebuild the comma-separated and plus-separated strings
            const newRecipeId = idarr.join(',');
            const newRecipeName = namearr.join('+');
            const newRecipeImage = imagearr.join('+');
            await pool.query('UPDATE favourites SET recipeid = $1, recipename = $2, recipeimage = $3 WHERE userid = $4',
                [newRecipeId, newRecipeName, newRecipeImage, userId]);

            return res.json({ success: true, message: 'Recipe removed from favourites' });
        } else {
            return res.json({ success: false, error: 'Recipe not found in favourites' });
        }
    } catch (error) {
        return res.json({ success: false, error: 'Server error' });
    }
});

export default router;
