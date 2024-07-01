import { query } from "../../database/databaseconn.js";

// Function to create tables
const createTables = async () => {
  try {
    await query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username TEXT,
        password TEXT
      );
    `);
    console.log('Users table created successfully.');

    await query(`
      CREATE TABLE IF NOT EXISTS favourites (
        id SERIAL PRIMARY KEY,
        userid TEXT,
        recipeid TEXT,
        recipename TEXT,
        recipeimage TEXT
      );
    `);
    console.log('Favourites table created successfully.');
  } catch (error) {
    console.error('Error creating tables:', error);
  } finally {
    process.exit();
  }
};

// Run the createTables function
createTables();
