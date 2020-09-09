import * as path from "path";
require("dotenv").config();

module.exports = {
  development: {
    client: "pg",
    connection: {
      host: process.env.CONNECTION_HOST,
      user: process.env.CONNECTION_USER,
      password: process.env.CONNECTION_PASSWORD,
      database: process.env.CONNECTION_DATABASE
    },
    migrations: {
      directory: path.resolve(__dirname, "src", "db", "migrations")
    },
    seeds: {
      directory: path.resolve(__dirname, "src", "db", "seeds")
    }
  },

  staging: {},

  production: {}
};
