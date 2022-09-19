import "reflect-metadata"
import { DataSource } from "typeorm"
import "dotenv/config"

const host = "localhost"

export const AppDataSource = new DataSource({
    type: "postgres",
    host,
    port: 5432,

    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    
    synchronize: false,
    logging: false,
    entities: ["./src/entities/*.ts"],
    migrations: ["./src/migrations/*.ts"]
})