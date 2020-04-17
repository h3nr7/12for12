/** Required modules */
import * as dotenv from 'dotenv';

if(process.env.NODE_ENV !== 'production') {
	dotenv.config();
}

import express from 'express';
import session from 'express-session';
import compression from 'compression';
import MemoryStore from "memorystore";
import bodyParser from 'body-parser';
import passport from 'passport';
import cors from "cors";
import helmet from "helmet";

import Scheduler, { SchedulerJob } from './common/scheduler';
import { usersRouter } from "./controller/users/users.router";
import { eventsRouter } from './controller/events/events.router';
import { errorHandler } from './middleware/error.middleware';
import { notFoundHandler } from './middleware/notFound.middleware';

import * as passportConfig from './config/passport';

/**  App variables */
const PORT: number = parseInt(process.env.PORT as string, 10);
const SESSION_SECRET: string = process.env.SESSION_SECRET;
const BASE_SCHEDULE_TIME: string = process.env.BASE_SCHEDULE_TIME_PATTERN;
const MemStore = MemoryStore(session);
/** App config */
const app = express();

app.use(compression());
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
	resave: true,
	saveUninitialized: true,
	secret: SESSION_SECRET,
	store: new MemStore({
		checkPeriod: 86400000
	})
}));
app.use(passport.initialize());
app.use(passport.session());



/** App routing */
app.use("/users", usersRouter);
app.use("/events", eventsRouter);

app.use(errorHandler);
app.use(notFoundHandler);

/** Server activation */
app.get('/', (req, res) => {
	res.send('All starts here too man');
});

const server = app.listen(PORT, err => {
	if(err) return console.error(err);
	return console.log(`server is listeneing on ${PORT}`);
});

/** Webpack HMR activation */
type ModuleId = string | number;

interface WebpackHotModule {
	hot?: {
		data: any;
		accept(
			dependencies: string[],
			callback?: (updatedDependencies: ModuleId[]) => void
		): void;
		accept(dependency: string, callback?: () => void): void;
		accept(errHandler?: (err: Error) => void): void;
		dispose(callback: (data: any) => void): void;
	};
}

declare const module: WebpackHotModule;

if(module.hot) {
	module.hot.accept();
	module.hot.dispose(() => server.close());
}