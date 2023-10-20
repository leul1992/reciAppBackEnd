const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// Import route files
const signupRoute = require('./routes/signup');
const loginRoute = require('./routes/login');
const saveFavouritesRoute = require('./routes/saveFavourites');
const showFavouritesRoute = require('./routes/showFavourites');
const deleteFromfavouritesRoute = require('./routes/deleteFromFavourites');

// Use the route files
app.use(signupRoute);
app.use(loginRoute);
app.use(saveFavouritesRoute);
app.use(showFavouritesRoute);
app.use(deleteFromfavouritesRoute);

// Start the server
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
