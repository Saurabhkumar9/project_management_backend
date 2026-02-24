import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { User } from "../modules/auth/user.entity";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DBURL,
  ssl: { rejectUnauthorized: false },
  synchronize: false, 
  logging: false,
  entities: [User],
});