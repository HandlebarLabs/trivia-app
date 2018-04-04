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
    knex.schema.createTable("pushNotifications", table => {
      table.increments("_id");
      table.text("token");
      table.string("platform");
      table.integer("timezoneOffset").defaultTo(240); // Default to EST
    })
  );

  chain.push(
    knex.schema.createTable("notifications", table => {
      table.increments("_id");
      table.timestamp("createdAt").defaultTo(knex.fn.now());
      table.text("data");
    })
  );

  chain.push(
    knex.schema.createTable("notificationReceivers", table => {
      table
        .integer("pushNotificationId")
        .unsigned()
        .notNullable();

      table
        .foreign("pushNotificationId")
        .onDelete("CASCADE")
        .references("_id")
        .inTable("pushNotifications");

      table
        .integer("notificationId")
        .unsigned()
        .notNullable();

      table
        .foreign("notificationId")
        .onDelete("CASCADE")
        .references("_id")
        .inTable("notifications");
    })
  );

  return Promise.all(chain);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable("questions"),
    knex.schema.dropTable("pushNotifications"),
    knex.schema.dropTable("notifications"),
    knex.schema.dropTable("notificationReceivers")
  ]);
};
