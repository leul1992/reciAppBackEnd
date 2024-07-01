export const up = function (knex) {
  return knex.schema.createTable('users', function (table) {
    table.increments('id').primary();
    table.string('username');
    table.string('password');
  });
};

export const down = function (knex) {
  return knex.schema.dropTable('users');
};
