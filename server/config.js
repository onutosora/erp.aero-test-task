import dotenv from "dotenv";

dotenv.config();

export const config = {
    PORT: process.env.PORT ?? 3333,
    DB_HOST: process.env.DB_HOST ?? "localhost",
    DB_PORT: process.env.DB_PORT ?? 3306,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_DATABASE: process.env.DB_DATABASE
}

