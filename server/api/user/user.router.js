import { Router } from "express";
import { getInfo, logout, signup, signin, refresh } from "./user.controller.js";
import authenticate from "#middlewares/authenticate.middleware.js";

const router = Router();

router.get("/info",                 authenticate,   getInfo);
router.post("/logout",              authenticate,   logout);

router.post("/signup",              signup);
router.post("/signin/new_token",    refresh);
router.post("/signin",              signin);

export default router;
