import "reflect-metadata";
import { DataSource } from "typeorm";
import { Client } from "./entities/Client";
import { Banker } from "./entities/Banker";
import { Transaction } from "./entities/Transaction";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "root",
  database: "typeorm-postgresql",
  synchronize: true,
  logging: false,
  entities: [Client, Banker, Transaction],
  migrations: [],
  subscribers: [],
});
