import * as Knex from "knex";
import { Injectable } from "@nestjs/common";

require("dotenv").config();

@Injectable()
export class ConfigService {
  private connection: Knex;

  constructor() {
    this.connection = Knex({
      client: "pg",
      connection: {
        host: process.env.CONNECTION_HOST,
        user: process.env.CONNECTION_USER,
        password: process.env.CONNECTION_PASSWORD,
        database: process.env.CONNECTION_DATABASE
      }
    });
  }

  public queryBuilder<T>(tableName: string) {
    return this.connection<T>(tableName);
  }
}
