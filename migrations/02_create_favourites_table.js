// migrations/01_create_favourites_table.js

exports.up = function (client) {
    return client.query(`
      CREATE TABLE IF NOT EXISTS favourites (
        id serial PRIMARY KEY,
        userid integer,
        recipeid integer,
        recipename text,
        recipeimage text
      );
    `);
  };
  
  exports.down = function (client) {
    return client.query('DROP TABLE favourites;');
  };
  