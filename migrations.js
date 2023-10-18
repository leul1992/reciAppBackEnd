const { Pool } = require('pg');
const path = require('path');

const pool = require('./database/databaseconn');

// Specify the directory where your migration scripts are stored
const migrationDirectory = path.join(__dirname, 'migrations');

const runMigrations = async () => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Get a list of migration files in the specified directory
    const migrationFiles = await client.query(
      'SELECT * FROM pgmigrations WHERE dir = $1',
      [migrationDirectory]
    );

    // Get the latest applied migration
    const lastAppliedMigration = migrationFiles.rows[migrationFiles.rows.length - 1];

    // Find the next migration to apply (if any)
    const nextMigrationIndex = migrationFiles.rows.findIndex((row) => row.name === lastAppliedMigration.name) + 1;

    if (nextMigrationIndex < migrationFiles.rows.length) {
      const nextMigration = migrationFiles.rows[nextMigrationIndex];
      const nextMigrationPath = path.join(migrationDirectory, nextMigration.name);

      const migrationModule = require(nextMigrationPath);
      await migrationModule.up(client);

      await client.query('INSERT INTO pgmigrations (name, dir) VALUES ($1, $2)', [
        nextMigration.name,
        migrationDirectory,
      ]);

      await client.query('COMMIT');
    } else {
    }
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
    pool.end();
  }
};

runMigrations();
