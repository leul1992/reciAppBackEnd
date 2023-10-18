const pool = require('../../database/databaseconn');
     pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id serial PRIMARY KEY,
        username text,
        password text
      );
    `);
     pool.query(`
    CREATE TABLE IF NOT EXISTS favourites (
      id serial PRIMARY KEY,
      userid text,
      recipeid text,
      recipename text,
      recipeimage text
    );
  `);

   
