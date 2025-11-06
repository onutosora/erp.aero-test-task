import asyncHandler from "express-async-handler";
import HttpError from "#utils/httpError.js";
import service from "./file.service.js";


export const uploadFile = asyncHandler(async (req, res, next) => {
    if (!req.file) throw new HttpError(400, "File is required!");

    await service.saveFile(
        req.file.originalname,
        req.file.mimetype,
        req.file.buffer,
        req.file.size
    );
    
    return res.json({
        success: true
    })
});

export const listFiles = asyncHandler(async (req, res, next) => {
    const list_size = Number(req.query.list_size || 10);
    const page = Number(req.query.page || 1);
    const files_list = await service.getFilesList(list_size, page);

    return res.json({
        files: files_list
    })
});

export const getFile = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const file_info = await service.getFileInfo(id);
    if (!file_info) throw new HttpError(404, "File not found!");

    return res.json(file_info);
});

export const downloadFile = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const file_data = await service.getFileData(id);
    if (!file_data) throw new HttpError(404, "File not found!");

    return res.download(
        file_data.path,
        file_data.originalname,
        (err) => {
            if (err) {
                res.status(500).json({success: false, error: "Failed to download file."});
            }
        }
    );
});

export const updateFile = asyncHandler(async (req, res, next) => {
    if (!req.file) throw new HttpError(400, "File is required!");

    await service.updateFile(
        req.params.id,
        req.file.originalname,
        req.file.mimetype,
        req.file.buffer,
        req.file.size
    );
    
    return res.json({
        success: true
    })
});

export const deleteFile = asyncHandler(async (req, res, next) => {
    await service.deleteFile(req.params.id);

    return res.json({
        success: true
    });
});


export default {
    uploadFile,
    listFiles,
    getFile,
    downloadFile,
    updateFile,
    deleteFile
}
