/** Required modules */
import * as dotenv from 'dotenv';

if(process.env.NODE_ENV !== 'production') {
	dotenv.config();
}

import * as bunyan from "bunyan";
import * as config from "config";
import * as fs from "fs";
import * as http from "http";
import * as path from "path";
import * as app from "./app";
import { Dependencies } from "./dependency-manager";

// global settings for these using config
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const PORT: number = parseInt(process.env.PORT as string, 10);
// path for logger
const logfilePath = path.join(__dirname, "..", "..", "logs");
const configFilePath = path.join(__dirname, "..", "..", "config");
if (!fs.existsSync(logfilePath)) {
    fs.mkdirSync(logfilePath);
}
const firstRunFileExists = fs.existsSync(path.join(configFilePath, ".firstrun"));
let firstRun = !firstRunFileExists;
if (process.env.FIRSTRUN) {
    firstRun = JSON.parse(process.env.FIRSTRUN) as boolean;
}

// create logger
const logger = bunyan.createLogger({
    name: "react-typescript-fullstack",
    streams: [
        {
            level: "info",
            path: path.join(logfilePath, "app.log")
        }
    ]
});

// create server
const server: http.Server = http.createServer(app.createApp(logfilePath));

/**
 * 
 * @param error on error handler
 */
function onError(error: NodeJS.ErrnoException): void {
    if (error.syscall !== "listen") {
        throw error;
    }

    const bind: string = typeof PORT === "string"
        ? "Pipe " + PORT
        : "Port " + PORT;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case "EACCES":
            logger.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            logger.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * on listening handler
 */
function onListening(): void {
    const bind: string = typeof server.address() === "string"
        ? "pipe " + server.address()
        : "port " + (server.address() as any).port;

    logger.info("Server is listening on " + bind);
}

// initialise server dependencies
Dependencies().Initialise(server, logger, logfilePath, firstRun).then(() => {
    server.listen(PORT);
    server.on("error", onError);
    server.on("listening", onListening);
}).catch((err: any) => {
    logger.error(err.message);
    logger.error(JSON.stringify(err));
});

