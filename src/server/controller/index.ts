import { Application } from 'express';
import * as path from "path";
import * as express from 'express';
import * as favicon from "serve-favicon";
import { errorHandler } from '../middleware/error.middleware';
import { notFoundHandler } from '../middleware/notFound.middleware';

import { homeController } from "./home.controller";
import { authController } from "./auth.controller";
import { usersController } from "./users.controller";
import { eventsController } from './events.controller';
import { relayworldController } from './relay-world.controller';
import { finalEventController } from './finalEvent.controller';
import { foodController } from './food.controller';

/**
 * REGISTER CONTROLLER TO PATHS
 * @param app
 */
export function registerRoutes(app: express.Application): void {

    app.use(favicon(path.join(__dirname, "..", "..", "..", "public", "favicon.ico")));

    app.use("/api/users", usersController);
    app.use("/api/events", eventsController);
    app.use('/api/food', foodController);
    app.use("/api/relay", relayworldController);
    app.use("/api/event12for12", finalEventController);
    app.use('/api', errorHandler);
    app.use('/api', notFoundHandler);

    /** auth routing */
    app.use("/auth", authController);
    /** static routing */
    app.use("/dist", express.static(path.join(__dirname, "..", "dist")));
    
    /** home */
    app.use("/*", homeController);

}