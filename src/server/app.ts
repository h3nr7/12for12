import * as config from "config";
import * as fs from "fs";
import * as path from "path";
import * as mongoose from 'mongoose';
import * as express from 'express';
import * as session from 'express-session';
import * as compression from 'compression';
import * as MemoryStore from "memorystore";
import * as bodyParser from 'body-parser';
import * as passport from 'passport';
import * as cors from "cors";
import * as helmet from "helmet";

import * as webpack from 'webpack';
import * as webpackDevMiddleware from "webpack-dev-middleware";
import * as webpackHotMiddleware from "webpack-hot-middleware";
import * as webpackConfig from '../webpack/webpack.config.dev';
import { registerRoutes } from './controller/index';

const isDevMode: boolean = process.env.NODE_ENV === "development" || false;
const isProdMode: boolean = process.env.NODE_ENV === "production" || false;

import { errorHandler } from './middleware/error.middleware';
import { notFoundHandler } from './middleware/notFound.middleware';
import * as passportConfig from './config/passport';


/**
 * CREATE AND BEGIN PP
 * @param logfilePath 
 */
export function createApp(logfilePath: string): express.Application {

	// init app
	const app: express.Application = express();
	// logger streams
	const accessLogFilename: string = config.get("Logfiles.AccessFilename");
	const accessLogStream: fs.WriteStream = fs.createWriteStream(path.join(logfilePath, accessLogFilename), { flags: "a" });
	
	// dev mode webpack compiler
	if(isDevMode) {
		const compiler: webpack.ICompiler = webpack(webpackConfig as webpack.Configuration);
		app.use(webpackDevMiddleware(compiler, { publicPath: webpackConfig.output.publicPath }));
		app.use(webpackHotMiddleware(compiler));
	}

	// prod mode built static resources
	app.use("/public", express.static(path.join(__dirname, "..", "..", "public")));
	if(isProdMode) {
		app.use("/dist", express.static(path.join(__dirname, "..", "dist")));
	}

	/**  App variables */
	const SESSION_SECRET: string = process.env.SESSION_SECRET;
	const BASE_SCHEDULE_TIME: string = process.env.BASE_SCHEDULE_TIME_PATTERN;
	const MemStore = MemoryStore(session);
	const MONGODB_URI = process.env.MONGODB_URI;

	mongoose.connect(MONGODB_URI, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true
	})
	.then(() => { console.log('Mongoose connected successfully!')})
	.catch((e:any) => { console.error('Mongoose connection error', e) });


	// app use
	app.use(compression());
	app.use(helmet());
	app.use(cors());
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

	registerRoutes(app);

	app.use(errorHandler);
	app.use(notFoundHandler);

	return app;
}