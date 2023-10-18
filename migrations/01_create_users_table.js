// migrations/01_create_users_table.js

exports.up = function (client) {
    return client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id serial PRIMARY KEY,
        username text,
        password text
      );
    `);
  };
  
  exports.down = function (client) {
    return client.query('DROP TABLE users;');
  };
  