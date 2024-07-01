import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

console.log(process.env.POSTGRES_URL);
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: false, // Adjust SSL settings as needed
});

export const query = (text, params) => pool.query(text, params);

export default pool;
