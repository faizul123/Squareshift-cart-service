import config from './config/init-config';
import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import apiRoutes from "./api/routes";
import { errorHandler } from "./middleware/error-handler";

export const createServer = () => {
    const app = express();

    app.use(express.json());
    app.use(helmet());
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(cors());
    app.use('/', apiRoutes);
    const server = app.listen(config.port, () => {
        console.log("server started")
    })
    app.use(errorHandler);
    return server;
};
