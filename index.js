import express, { json } from 'express';
import cors from 'cors';
import signupRoute from './server/routes/signup.js';
import loginRoute from './server/routes/login.js';
import saveFavouritesRoute from './server/routes/saveFavourites.js';
import showFavouritesRoute from './server/routes/showFavourites.js';
import deleteFromFavouritesRoute from './server/routes/deleteFromFavourites.js';

import knex from 'knex';
import { Model } from 'objection';
import knexConfig from './knexfile.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

const environment = process.env.NODE_ENV || 'development';
const db = knex(knexConfig[environment]);

Model.knex(db);

db.migrate.latest()
  .then(() => {
    console.log('Database migrated');

    app.use(cors());
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
  })
  .catch(err => {
    console.error('Failed to migrate database:', err);
    process.exit(1);
  });
