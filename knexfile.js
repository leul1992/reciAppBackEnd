import dotenv from 'dotenv';
import path from 'path';

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
      directory: path.resolve('migrations'),  // Use path.resolve to dynamically resolve the directory
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
      directory: path.resolve('migrations'),  // Use path.resolve to dynamically resolve the directory
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
      directory: path.resolve('migrations'),  // Use path.resolve to dynamically resolve the directory
      tableName: 'knex_migrations'
    }
  }
};

export default knexConfig;
