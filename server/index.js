const express = require("express");
const app = express();
const cors = require("cors"); // Import the cors middleware
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

// Enable CORS with specific origins
app.use(cors({
  origin: ['https://reci-app-front-lukd8953v-leul1992.vercel.app', 'localhost:3000'], // Replace with your frontend's domain
  optionsSuccessStatus: 200, // Some legacy browsers (IE11) choke on a 204 response.
}));

// Start the server
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
