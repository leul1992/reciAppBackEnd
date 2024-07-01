export const up = function (knex) {
  return knex.schema.createTable('favourites', function (table) {
    table.increments('id').primary();
    table.string('userid');
    table.string('recipeid');
    table.string('recipename');
    table.string('recipeimage');
  });
};

export const down = function (knex) {
  return knex.schema.dropTable('favourites');
};
