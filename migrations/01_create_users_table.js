exports.up = function (knex) {
  return knex.schema.createTable('users', function (table) {
    table.increments('id').primary();
    table.string('username');
    table.string('password');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
