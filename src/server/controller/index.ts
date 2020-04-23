import { Application } from 'express';
import * as path from "path";
import * as express from 'express';
import * as favicon from "serve-favicon";
import { homeController } from "./home.controller";
import { authController } from "./auth.controller";
import { usersController } from "./users.controller";
import { eventsController } from './events.controller';
import { relayworldController } from './relay-world.controller';
import { finalEventController } from './finalEvent.controller';

/**
 * REGISTER CONTROLLER TO PATHS
 * @param app
 */
export function registerRoutes(app: express.Application): void {

    app.use(favicon(path.join(__dirname, "..", "..", "..", "public", "favicon.ico")));

    app.use("/auth", authController);
    app.use("/api/users", usersController);
    app.use("/api/events", eventsController);
    app.use("/api/relay", relayworldController);
    app.use("/api/event12for12", finalEventController);

    /** static routing */
    app.use("/dist", express.static(path.join(__dirname, "..", "dist")));
    /** home */
    app.use("/", homeController);

}