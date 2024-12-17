import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable("users", function (table) {
      table.uuid("id").primary().defaultTo(knex.raw("(UUID())"));
      table.string("email").notNullable().unique();
      table.string("phoneNumber", 20).notNullable().unique();
      table.string("password").notNullable();
      table.string("firstName", 100).notNullable();
      table.string("lastName", 100).notNullable();
      table.string("role", 20).notNullable().defaultTo("User");
      table.string("username", 50).notNullable();
      table.boolean("isActive").defaultTo(true);
      table.boolean("isBlacklisted").defaultTo(false);
      table.timestamp("createdAt").defaultTo(knex.fn.now());
      table.timestamp("updatedAt").defaultTo(knex.fn.now());
    })
    .createTable("wallets", (table) => {
      table.uuid("id").primary().defaultTo(knex.raw("(UUID())"));
      table.uuid("user").references("id").inTable("users");
      table.decimal("balance", 19, 4).defaultTo(0.0);
      table.string("currency", 3).defaultTo("NGN");
      table.string("role", 20).defaultTo("User");
      table.boolean("isActive").defaultTo(true);
      table.timestamp("createdAt").defaultTo(knex.fn.now());
      table.timestamp("updatedAt").defaultTo(knex.fn.now());
    })
    .createTable("transactions", (table) => {
      table.uuid("id").primary().defaultTo(knex.raw("(UUID())"));
      table.uuid("wallet").references("id").inTable("wallets");
      table.uuid("user").references("id").inTable("users");
      table.string("transactionType", 20).notNullable();
      table.decimal("amount", 19, 4).notNullable();
      table.string("reference", 100).unique().notNullable();
      table.string("status", 20).notNullable().defaultTo("pending");
      table.jsonb("metadata").nullable();
      table.timestamp("createdAt").defaultTo(knex.fn.now());
      table.timestamp("updatedAt").defaultTo(knex.fn.now());

      table.index("reference");
      table.index("status");
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTableIfExists("transactions")
    .dropTableIfExists("wallets")
    .dropTableIfExists("users");
}
