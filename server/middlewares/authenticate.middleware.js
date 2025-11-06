import asyncHandler from "express-async-handler";
import HttpError from "#utils/httpError.js";
import { verifyAccessToken } from "#utils/jwt.js";

const authenticate = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) throw new HttpError(401, "Unauthorized!");

    let payload = null;
    try {
        payload = await verifyAccessToken(token);
    } catch (error) {
        
    }
     
    if (!payload) throw new HttpError(401, "Unauthorized!");

    req.user = payload.id;

    next();
});

export default authenticate;
