import jwt from "jsonwebtoken";
import config from "#config.js";
import db from "#db.js";

export async function generateAccessToken(user) {
    const token = jwt.sign(
        user,
        config.JWT_ACCESS_SECRET_KEY,
        { expiresIn: String(config.JWT_ACCESS_LIFETIME)+"m" }
    );
    await db.query("INSERT INTO jwt_tokens (token, owner, type) VALUES (?, ?, ?)", [token, user.id, 'access']);
    return token;
}

export async function generateRefreshToken(user) {
    const token = jwt.sign(
        user,
        config.JWT_REFRESH_SECRET_KEY,
        { expiresIn: String(config.JWT_REFRESH_LIFETIME)+"m" }
    );
    await db.query("INSERT INTO jwt_tokens (token, owner, type) VALUES (?, ?, ?)", [token, user.id, 'refresh']);
    return token;
}

export async function refreshAccessToken(refresh_token) {
    const [rows, _] = await db.query("SELECT owner, blocked FROM jwt_tokens WHERE token = ?", [refresh_token]);
    const blocked = rows[0]?.blocked;
    const owner = rows[0]?.owner;

    if (!owner || blocked) return null;

    let verified = null;
    try {
        verified = jwt.verify(refresh_token, config.JWT_REFRESH_SECRET_KEY);
    } catch (error) {
        console.log("Error on refresh token verification: ", error);
    }

    if (!verified) return null;

    if (owner !== verified.id) return null;

    const new_access_token = await generateAccessToken({id: owner});
    
    return new_access_token;
}

export async function verifyAccessToken(access_token) {
    const [rows, _] = await db.query("SELECT owner, blocked FROM jwt_tokens WHERE token = ? AND type = 'access'", [access_token]);
    const blocked = rows[0]?.blocked;
    const owner = rows[0]?.owner;
    if (blocked) return null;
    let verified = null;
    try {
        verified = jwt.verify(access_token, config.JWT_ACCESS_SECRET_KEY);
    } catch (error) {
        console.log("Error on access token verification: ", error);
    }
    if (!verified) return null;
    if (owner !== verified.id) return null;
    return verified;
}

export async function blockToken(token) {
    await db.query("UPDATE jwt_tokens SET blocked = 1 WHERE token = ?", [token]);
}