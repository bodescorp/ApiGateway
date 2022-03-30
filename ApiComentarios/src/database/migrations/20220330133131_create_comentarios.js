
exports.up = function (knex) {
  return knex.schema.createTable('comentarios', function (table) {
    table.increments('id').primary();
    table.string('id_book').notNullable();
    table.text('comentario').notNullable();
    table.string('user').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  })
};

exports.down = function (knex) {
  return knex.schema.dropTable('comentarios');
};
