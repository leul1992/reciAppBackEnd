const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const cors = require('cors'); // Import the cors package

app.use(express.json());

// Define a whitelist of allowed origins (including your Vercel app and Render.com static IPs)
const whitelist = [
  'http://localhost:3000', // Your local development server
  'https://reci-app-front-end.vercel.app', // Your Vercel-hosted React app
  'http://13.228.225.19', // Render.com static IP
  'http://18.142.128.26',  // Render.com static IP
  'http://54.254.162.138'  // Render.com static IP
];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions)); // Use the cors middleware with the specified options

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
