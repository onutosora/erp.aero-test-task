import bcrypt from "bcryptjs";
import config from "#config.js";
import db from "#db.js";
import HttpError from "#utils/httpError.js";
import { generateAccessToken, generateRefreshToken, refreshAccessToken, blockToken } from "#utils/jwt.js";

export async function createUser(id, password) {

    var hashedPassword = bcrypt.hashSync(password, config.PASSWORDS_HASH_SALT_ROUNDS);
    
    try {
        await db.query("INSERT INTO users (id, password) VALUES (?, ?)", [id, hashedPassword]);
    } catch (error) {
        switch (error.code) {
            case "ER_DUP_ENTRY":
                throw new HttpError(400, `User with id "${id}" already exists!`);
        }
    }
}

export async function signinUser(id, password) {
    const [rows, _] = await db.query("SELECT password FROM users WHERE id = ?", [id]);
    const hashed_password = rows[0]?.password;
    if (!hashed_password) throw new HttpError(401, `User with id "${id}" does not exist!`);
    
    const valid = bcrypt.compareSync(password, hashed_password);
    if (!valid) throw new HttpError(401, "Invalid password!");

    const payload = {id};
    const access_token = await generateAccessToken(payload);
    const refresh_token = await generateRefreshToken(payload);

    return {access_token, refresh_token};
}

export async function refreshUser(refresh_token) {
    
    const new_access_token = await refreshAccessToken(refresh_token);
    if (!new_access_token) throw new HttpError(401, "Invalid refresh token!");

    return {access_token: new_access_token};

}

export async function logoutUser(access_token, refresh_token) {
    await blockToken(access_token);
    await blockToken(refresh_token);
}

export default {
    createUser,
    signinUser,
    refreshUser,
    logoutUser
}
