import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import errorHandler from "./middlewares/error-handler.middleware.js";
import apiRouter from "./api/api.js";


const app = express();


app.use(express.json());
app.use(cookieParser());
app.use(cors(
    {
        origin: (origin, callback) => {
            callback(null, origin || "*");
        },
        credentials: true
    }
));

app.use("", apiRouter);

app.use(errorHandler);

export default app;
