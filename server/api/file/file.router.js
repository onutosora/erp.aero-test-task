import { Router } from "express";
import authenticate from "#middlewares/authenticate.middleware.js";
import muter_upload from "#middlewares/file-upload.js";
import controller from "./file.controller.js";

const router = Router();

// Every request must be authenticated

// Requires file upload ("file" field)
router.post("/upload",          authenticate, muter_upload.single("file"), controller.uploadFile);

// Query params: list_size, page
router.get("/list",             authenticate, controller.listFiles);

router.get("/:id",              authenticate, controller.getFile);

router.get("/download/:id",     authenticate, controller.downloadFile);

// Requires file upload ("file" field)
router.put("/update/:id",       authenticate, muter_upload.single("file"), controller.updateFile);

router.delete("/delete/:id",    authenticate, controller.deleteFile);

export default router;
