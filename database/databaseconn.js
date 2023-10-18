const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: 'postgres://leul:qxYPhvhkMqKpMl2CbNwOuVObAeWvjGAy@dpg-ckjuloolk5ic738cavlg-a.singapore-postgres.render.com/reciapp_hs05',
  ssl: {
    rejectUnauthorized: true
  }
});

module.exports = pool;