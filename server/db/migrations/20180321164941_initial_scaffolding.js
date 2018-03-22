exports.up = function(knex, Promise) {
  const chain = [];

  chain.push(
    knex.schema.createTable("questions", table => {
      table.increments("_id");
      table.text("question");
      table.integer("totalResponses");
      table.text("answers");
      table.boolean("asked");
      table.boolean("isCurrent");
    })
  );

  chain.push(
    knex.schema.createTable("users", table => {
      table.increments("_id");
      table.string("username");
      table.text("pushTokens");
    })
  );

  return Promise.all(chain);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable("questions"),
    knex.schema.dropTable("users")
  ]);
};
