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

import Scheduler from './common/scheduler';
import * as zwiftService from './service/zwift.service'
import { ZwiftAuthResponse, ModifiedResponse } from "./service/zwift.interface";
import { getRelayWorldFeed } from './service/zwift.service';
import { RelayWorld } from './model/relay-world.interface';
import { RelayWorld as RelayWorldModel } from './model/relay-world';



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

	// DB job
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



	// ------------------------------------------------------------
	// Scheduler (TEMP)
	// ------------------------------------------------------------
	const scheduler = new Scheduler();
	const refreshToken: string = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJPLUVjXzJJNjg5bW9peGJIZzFfNDZDVFlGeEdZMDViaDluYm5Mcjl0RzY4In0.eyJqdGkiOiI0ODE4OGU1My03OTM2LTQzMzYtYTFjMi05MzY2MDljMmYzZDQiLCJleHAiOjE1ODk3ODIzODcsIm5iZiI6MCwiaWF0IjoxNTg3MTkwMzg3LCJpc3MiOiJodHRwczovL3NlY3VyZS56d2lmdC5jb20vYXV0aC9yZWFsbXMvendpZnQiLCJhdWQiOiJad2lmdF9Nb2JpbGVfTGluayIsInN1YiI6ImJhNWEyZjc3LWY3ZGItNDdiMi1hOWE1LTUxOWY0YzViNDFkZSIsInR5cCI6IlJlZnJlc2giLCJhenAiOiJad2lmdF9Nb2JpbGVfTGluayIsImF1dGhfdGltZSI6MCwic2Vzc2lvbl9zdGF0ZSI6IjI1MTRlNDg3LWFlOGQtNDcxNi05M2IzLTUyYzQ0OWMzYmQxYiIsInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJldmVyeWJvZHkiLCJ0cmlhbC1zdWJzY3JpYmVyIiwiZXZlcnlvbmUiLCJiZXRhLXRlc3RlciJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImVtYWlsLXByZWZzLXNlcnZpY2UiOnsicm9sZXMiOlsiYXV0aGVudGljYXRlZC11c2VyIl19LCJteS16d2lmdCI6eyJyb2xlcyI6WyJhdXRoZW50aWNhdGVkLXVzZXIiXX0sIkdhbWVfTGF1bmNoZXIiOnsicm9sZXMiOlsiYXV0aGVudGljYXRlZC11c2VyIl19LCJzc28tZ2F0ZXdheSI6eyJyb2xlcyI6WyJhdXRoZW50aWNhdGVkLXVzZXIiXX0sInN1YnNjcmlwdGlvbi1zZXJ2aWNlIjp7InJvbGVzIjpbImF1dGhlbnRpY2F0ZWQtdXNlciJdfSwiWndpZnQgUkVTVCBBUEkgLS0gcHJvZHVjdGlvbiI6eyJyb2xlcyI6WyJhdXRob3JpemVkLXBsYXllciIsImF1dGhlbnRpY2F0ZWQtdXNlciJdfSwiWndpZnQgWmVuZGVzayI6eyJyb2xlcyI6WyJhdXRoZW50aWNhdGVkLXVzZXIiXX0sIlp3aWZ0IFJlbGF5IFJFU1QgQVBJIC0tIHByb2R1Y3Rpb24iOnsicm9sZXMiOlsiYXV0aG9yaXplZC1wbGF5ZXIiXX0sImVjb20tc2VydmVyIjp7InJvbGVzIjpbImF1dGhlbnRpY2F0ZWQtdXNlciJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fX0.esZEbb0nx76ycYr1VifZfwEAP06a-mjey_Cxrt6k5zlieB0OOAJScAumFVUUXifINo6mKzk5L1HolFk0oL7KymYTBKMS5U8a6lfQygIE49iRoKC4Vt5R6VJJv4q3vvmemSVTrIQGu8zk3jaT4wDn5pUlRTsEimWJzhZnJkK0JPS3ONXuAfF7Lzy0hXlHJqTIYoDYKi0Uqxca2yM1yA-6T7DWbWZmXyjK8JshWKP-kcW4wiG5R7PQPXw9Jbw0kwzGp_-g7Ig4MEAI74xhZzRFPFCoM2T54JfTfWXHWZNNdDmwhikqIxyNDjwA5RLvsmDGTJwy7RBC8vRmTfCIyQ8H6g";
	let access_token: string = null;

	app.use((req:express.Request, res: express.Response, next: express.NextFunction) => {
		req.session.zwift_access_token = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJPLUVjXzJJNjg5bW9peGJIZzFfNDZDVFlGeEdZMDViaDluYm5Mcjl0RzY4In0.eyJqdGkiOiJlMzRmZWY1Mi1jYWJlLTRjZjctYjJhMy1lNzIxMjQwYjVmZTQiLCJleHAiOjE1ODcyMzEwNDEsIm5iZiI6MCwiaWF0IjoxNTg3MjA5NDQxLCJpc3MiOiJodHRwczovL3NlY3VyZS56d2lmdC5jb20vYXV0aC9yZWFsbXMvendpZnQiLCJhdWQiOiJad2lmdF9Nb2JpbGVfTGluayIsInN1YiI6ImJhNWEyZjc3LWY3ZGItNDdiMi1hOWE1LTUxOWY0YzViNDFkZSIsInR5cCI6IkJlYXJlciIsImF6cCI6Ilp3aWZ0X01vYmlsZV9MaW5rIiwiYXV0aF90aW1lIjowLCJzZXNzaW9uX3N0YXRlIjoiYzMwMWE3NTEtNzIxZi00NGNjLWE4NjgtM2IyNmQ4OTFjM2NjIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6W10sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJldmVyeWJvZHkiLCJ0cmlhbC1zdWJzY3JpYmVyIiwiZXZlcnlvbmUiLCJiZXRhLXRlc3RlciJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImVtYWlsLXByZWZzLXNlcnZpY2UiOnsicm9sZXMiOlsiYXV0aGVudGljYXRlZC11c2VyIl19LCJteS16d2lmdCI6eyJyb2xlcyI6WyJhdXRoZW50aWNhdGVkLXVzZXIiXX0sIkdhbWVfTGF1bmNoZXIiOnsicm9sZXMiOlsiYXV0aGVudGljYXRlZC11c2VyIl19LCJzc28tZ2F0ZXdheSI6eyJyb2xlcyI6WyJhdXRoZW50aWNhdGVkLXVzZXIiXX0sInN1YnNjcmlwdGlvbi1zZXJ2aWNlIjp7InJvbGVzIjpbImF1dGhlbnRpY2F0ZWQtdXNlciJdfSwiWndpZnQgUkVTVCBBUEkgLS0gcHJvZHVjdGlvbiI6eyJyb2xlcyI6WyJhdXRob3JpemVkLXBsYXllciIsImF1dGhlbnRpY2F0ZWQtdXNlciJdfSwiWndpZnQgWmVuZGVzayI6eyJyb2xlcyI6WyJhdXRoZW50aWNhdGVkLXVzZXIiXX0sIlp3aWZ0IFJlbGF5IFJFU1QgQVBJIC0tIHByb2R1Y3Rpb24iOnsicm9sZXMiOlsiYXV0aG9yaXplZC1wbGF5ZXIiXX0sImVjb20tc2VydmVyIjp7InJvbGVzIjpbImF1dGhlbnRpY2F0ZWQtdXNlciJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwibmFtZSI6IkhlbnJ5IEhvIHtNQlBDK0xGVEN9IiwicHJlZmVycmVkX3VzZXJuYW1lIjoiaGVucnl5cC5ob0BnbWFpbC5jb20iLCJnaXZlbl9uYW1lIjoiSGVucnkiLCJmYW1pbHlfbmFtZSI6IkhvIHtNQlBDK0xGVEN9IiwiZW1haWwiOiJoZW5yeXlwLmhvQGdtYWlsLmNvbSJ9.AWw-jnqL8B-PYfyc4saOYEgRrAxym2kO8idVFxy84o0eJEuYvv3Xp85yxl25ncb72zjpiPO0OWX5Ejtrg95bgd-G7cgm9tyWD_9hI1YEtjBR5iHqAjKDWh9ig7erk8XciERcjXgELH7JMHcN2kX05cC_3ZZSd07C3b4piNA0IPAOEbrtiZKcfBWLYQcdFDXXbZuZa6SmwD3tF-rIyeknTykftuAPx17o3ubeKHXTkOlNuHDjvbZo5fkpxv6PSGXJKwVoWeJTRZHzRoRhdR-mjygyGdZN2fRY0H8555KNxed-U_Z8HxkJn2XXo-WSTexG36xoNL_8inuCZIxO98J84A';
		next();
	});

	if(isProdMode) {
		// cron to get new access-token
		zwiftService.refreshTokenLogin(refreshToken)
		.then(res => {
			access_token = res.access_token;
			app.use((req:express.Request, res: express.Response) => {
				req.session.zwift_access_token = access_token;
				console.log('savedto session initial access token', access_token);
			});
			console.log('got initial access token', access_token);
			getRelayWorldFeed(access_token)
				.then(relayWorldData => RelayWorldModel.create(relayWorldData))
				.then(() => { console.log('Added iniitial scheduled record') });
		});

		scheduler.add(1, '*/15 * * * *', () => {
			console.log(`new Base Schedule for access tokenstarted for every pattern ${'*/15 * * * *'}`);
			zwiftService.refreshTokenLogin(refreshToken)
				.then(res => {
					access_token = res.access_token;
				});
		});

		scheduler.add(2, '*/3 * * * *', () => {
			console.log(`new Base Schedule started for every pattern ${'*/3 * * * *'}`);
			getRelayWorldFeed(access_token)
				.then(relayWorldData => RelayWorldModel.create(relayWorldData))
				.then(() => { console.log('Added another scheduled record') });
		});
	}
	// ------------------------------------------------------------



	registerRoutes(app);

	app.use(errorHandler);
	app.use(notFoundHandler);

	return app;
}