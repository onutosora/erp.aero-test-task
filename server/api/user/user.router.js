import { Router } from "express";
import { getInfo, logout, signup, signin, refresh } from "./user.controller.js";
import authenticate from "#middlewares/authenticate.middleware.js";

const router = Router();

// Requires authentication
router.get("/info",                 authenticate,   getInfo);

// Requires authentication
router.post("/logout",              authenticate,   logout);

// Requires json body with "id" and "password" fields
router.post("/signup",              signup);

// Requires "refresh_token" cookie
router.post("/signin/new_token",    refresh);

// Requires json body with "id" and "password" fields
router.post("/signin",              signin);

export default router;
