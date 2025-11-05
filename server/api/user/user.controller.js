import asyncHandler from "express-async-handler";
import { assertBodyField } from "#utils/httpAssertions.js";
import { create_user, signin_user, refresh_user, logout_user } from "./user.service.js";
import config from "#config.js";

export const get_info = asyncHandler(async (req, res, next) => {

    const id = req.user;

    return res.json({
        id
    })
});

export const signup = asyncHandler(async (req, res, next) => {
    assertBodyField(req, "id");
    assertBodyField(req, "password");

    await create_user(req.body.id, req.body.password);

    res.json({
        success: true
    });
});

export const signin = asyncHandler(async (req, res, next) => {
    assertBodyField(req, "id");
    assertBodyField(req, "password");

    const { access_token, refresh_token } = await signin_user(req.body.id, req.body.password);

    res.cookie("refresh_token", refresh_token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: config.JWT_REFRESH_LIFETIME,
    });

    res.json({
        success: true,
        access_token
    });
});

export const refresh = asyncHandler(async (req, res, next) => {
    const token = req.cookies.refresh_token;
    if (!token) throw new HttpError(401, "Refresh token is required!");
    
    const { access_token } = await refresh_user(token);

    return res.json({
        success: true,
        access_token
    });
});

export const logout = asyncHandler(async (req, res, next) => {
    const refresh_token = req.cookies.refresh_token;
    if (token) {
        const authHeader = req.headers.authorization;
        const access_token = authHeader && authHeader.split(" ")[1];

        await logout_user(access_token, refresh_token);
        res.clearCookie("refresh_token");
    }
    return res.json({
        success: true
    })
});
