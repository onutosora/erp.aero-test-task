import { Router } from "express";
import userRouter from "./user/user.router.js";
import fileRouter from "./file/file.router.js";

const router = Router();

router.use("/file", fileRouter);
router.use("", userRouter);

export default router;
