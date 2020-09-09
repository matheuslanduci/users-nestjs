import Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("users", table => {
    table.increments("id").primary();
    table.string("username").notNullable();
    table.string("password").notNullable();
    table.string("firstName").notNullable();
    table.string("lastName").notNullable();
    table.date("birthDate").notNullable();
    table.text("biography").nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("users");
}
