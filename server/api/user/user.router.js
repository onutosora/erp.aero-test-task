import { Router } from "express";
import { get_info, signin, signup, refresh, logout } from "./user.controller.js";
import authenticate from "#middlewares/authenticate.middleware.js";

const router = Router();

router.get("/info",                 authenticate,   get_info);
router.post("/logout",              authenticate,   logout);

router.post("/signup",              signup);
router.post("/signin/new_token",    refresh);
router.post("/signin",              signin);

export default router;
