exports.up = function(knex, Promise) {
  return knex.schema.createTable("questions", table => {
    table.increments("_id");
    table.text("question");
    table.integer("totalResponses");
    table.json("answers");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("questions");
};
