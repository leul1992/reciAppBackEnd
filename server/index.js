// index.js
import express, { json } from "express";
import cors from "cors"; // Import the cors middleware
import signupRoute from './routes/signup.js';
import loginRoute from './routes/login.js';
import saveFavouritesRoute from './routes/saveFavourites.js';
import showFavouritesRoute from './routes/showFavourites.js';
import deleteFromFavouritesRoute from './routes/deleteFromFavourites.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors()); // Enable CORS with specific origins
app.use(json());

// Use the route files
app.use(signupRoute);
app.use(loginRoute);
app.use(saveFavouritesRoute);
app.use(showFavouritesRoute);
app.use(deleteFromFavouritesRoute);

// Start the server
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
