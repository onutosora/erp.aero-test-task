import db from "#db.js";
import fs from "fs";


const UPLOAD_DIR = "./uploads";


function testUploadDir() {
    if (!fs.existsSync(UPLOAD_DIR)) {
        fs.mkdirSync(UPLOAD_DIR);
    }
}

export async function saveFile(filename, mimetype, file, size) {
    testUploadDir();
    const fileFormat = filename.split(".").pop();

    const connection = await db.getConnection()

    connection.beginTransaction();

    await connection.query(`
        INSERT INTO files
            (name, format, mime, size)
        VALUES (?, ?, ?, ?)
    `, [filename, fileFormat, mimetype, size]);
    const [rows, _] = await connection.query(`SELECT LAST_INSERT_ID() AS id;`);
    const id = rows[0].id;

    connection.commit();

    const filePath = `${UPLOAD_DIR}/${id}.${fileFormat}`;
    fs.writeFileSync(filePath, file);
}

export async function getFilesList(list_size, page) {
    const [rows, _] = await db.query(`
        SELECT id, name, format, mime, size
        FROM files LIMIT ? OFFSET ?
        `, [list_size, (page - 1) * list_size]
    );
    return rows;
}

export async function getFileInfo(id) {
    const [rows, _] = await db.query(`
        SELECT id, name, format, mime, size
        FROM files WHERE id = ?
        `, [id]
    );
    return rows[0];
}

export async function getFileData(id) {
    const [rows, _] = await db.query(`
        SELECT id, name, format, mime, size
        FROM files WHERE id = ?
        `, [id]
    );
    if (!rows[0]) return null;
    const filePath = `${UPLOAD_DIR}/${id}.${rows[0].format}`;
    return {
        originalname: rows[0].name,
        path: filePath
    };
}

export async function updateFile(id, filename, mimetype, file, size) {
    testUploadDir();
    
    const [rows, _] = await db.query("SELECT format FROM files WHERE id = ?", [id]);
    const format = rows[0]?.format;
    if (!format) return false;

    const filePath = `${UPLOAD_DIR}/${id}.${format}`;
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    const new_format = filename.split(".").pop();
    
    await db.query(`
        UPDATE files SET 
            name = ?,
            mime = ?,
            size = ?,
            format = ?
        WHERE id = ?`
        , [filename, mimetype, size, new_format, id]
    );
    fs.writeFileSync(`${UPLOAD_DIR}/${id}.${new_format}`, file);

    return true
}

export async function deleteFile(id) {
    const [rows, _] = await db.query("SELECT format FROM files WHERE id = ?", [id]);
    const format = rows[0]?.format;
    if (!format) return;

    await db.query("DELETE FROM files WHERE id = ?", [id]);

    const filePath = `${UPLOAD_DIR}/${id}.${format}`;
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    
}


export default {
    saveFile,
    getFilesList,
    getFileInfo,
    getFileData,
    updateFile,
    deleteFile
}
