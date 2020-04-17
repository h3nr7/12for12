/** Required modules */
import * as dotenv from 'dotenv';

if(process.env.NODE_ENV !== 'production') {
	dotenv.config();
}

import path from "path";
import favicon from "serve-favicon";
import mongoose from 'mongoose';
import express from 'express';
import session from 'express-session';
import compression from 'compression';
import MemoryStore from "memorystore";
import bodyParser from 'body-parser';
import passport from 'passport';
import cors from "cors";
import helmet from "helmet";

import { homeController } from "./controller/home.controller";
import { authController } from "./controller/auth.controller";
import { usersController } from "./controller/users.controller";
import { eventsController } from './controller/events.controller';
import { errorHandler } from './middleware/error.middleware';
import { notFoundHandler } from './middleware/notFound.middleware';

import * as passportConfig from './config/passport';

/**  App variables */
const PORT: number = parseInt(process.env.PORT as string, 10);
const SESSION_SECRET: string = process.env.SESSION_SECRET;
const BASE_SCHEDULE_TIME: string = process.env.BASE_SCHEDULE_TIME_PATTERN;
const MemStore = MemoryStore(session);
const MONGODB_URI = process.env.MONGODB_URI;
/** App config */
const app = express();

mongoose.connect(MONGODB_URI, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true
})
.then(() => { console.log('Mongoose connected successfully!')})
.catch((e:any) => { console.error('Mongoose connection error', e) });

app.use(compression());
app.use(helmet());
// app.use(cors());
app.use(bodyParser.json());
app.use(compression());
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


/** assets routing */
app.use(favicon(path.join(__dirname, "..", "..", "public", "favicon.ico")));
/** App routing */
app.use("/auth", authController);
app.use("/api/users", usersController);
app.use("/api/events", eventsController);
/** static routing */
app.use("/dist", express.static(path.join(__dirname, "..", "dist")));
/** home */
app.use("/", homeController);

app.use(errorHandler);
app.use(notFoundHandler);

/** Server activation */
app.get('/', (req, res) => {
	res.send('All starts here too man');
});

const server = app.listen(PORT, err => {
	if(err) return console.error(err);
	return console.log(`server is listening on ${PORT}`);
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