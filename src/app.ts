import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import apiRoutes from "./api/routes";
import { errorHandler } from "./middleware/error-handler";

export const createServer = (): express.Application => {
    const app = express();

    app.use(express.json());
    app.use(helmet());
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(cors());
    app.use('/', apiRoutes);
    app.listen(3000, () => {
        console.log("server started")
    })
    app.use(errorHandler);
    return app;
};
