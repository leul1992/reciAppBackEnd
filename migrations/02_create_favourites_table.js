exports.up = function (knex) {
  return knex.schema.createTable('favourites', function (table) {
    table.increments('id').primary();
    table.integer('userid');
    table.integer('recipeid');
    table.string('recipename');
    table.string('recipeimage');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('favourites');
};
