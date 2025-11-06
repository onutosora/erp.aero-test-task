import dotenv from "dotenv";

dotenv.config();

export default {
    PORT: process.env.PORT ?? 3333,
    DB_HOST: process.env.DB_HOST ?? "localhost",
    DB_PORT: process.env.DB_PORT ?? 3306,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_DATABASE: process.env.DB_DATABASE,
    PASSWORDS_HASH_SALT_ROUNDS: Number(process.env.PASSWORDS_HASH_SALT_ROUNDS ?? 10),
    JWT_ACCESS_SECRET_KEY: process.env.JWT_ACCESS_SECRET_KEY,
    JWT_REFRESH_SECRET_KEY: process.env.JWT_REFRESH_SECRET_KEY,
    JWT_ACCESS_LIFETIME: Number(process.env.JWT_ACCESS_LIFETIME ?? 10),
    JWT_REFRESH_LIFETIME: Number(process.env.JWT_REFRESH_LIFETIME ?? 24*60)
}

