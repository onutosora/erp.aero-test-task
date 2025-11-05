import HttpError from "./httpError.js";

export const assertBodyField = (req, field) => {
    if (!req?.body[field]) {
        throw new HttpError(400, `Field "${field}" is required!`);
    }
}
