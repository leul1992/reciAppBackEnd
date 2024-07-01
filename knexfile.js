import dotenv from 'dotenv';

dotenv.config();

const knexConfig = {
  development: {
    client: 'postgresql',
    connection: process.env.POSTGRES_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './migrations',  // Ensure this path is correct
      tableName: 'knex_migrations'
    }
  },
  staging: {
    client: 'postgresql',
    connection: process.env.POSTGRES_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './migrations',  // Ensure this path is correct
      tableName: 'knex_migrations'
    }
  },
  production: {
    client: 'postgresql',
    connection: process.env.POSTGRES_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './migrations',  // Ensure this path is correct
      tableName: 'knex_migrations'
    }
  }
};

export default knexConfig;
