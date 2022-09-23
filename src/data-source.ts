import 'reflect-metadata'
import { DataSource } from 'typeorm'
import 'dotenv/config'

const host = process.env.IS_COMPOSE ? "db" : 'localhost'

export const AppDataSource = new DataSource(
  process.env.NODE_ENV === 'test'
    ? {
        type: "sqlite",
        database: ":memory:",
        synchronize: true,
        entities: ["src/entities/*.ts"]
    }
    : {
        type: 'postgres',
        host,
        port: 5432,

        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,

        synchronize: true,
        logging: false,
        entities: ['./src/entities/*.ts'],
        migrations: ['./src/migrations/*.ts'],
      }
)
