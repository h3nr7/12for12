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
	// const scheduler = new Scheduler();
	// const refreshToken: string = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJPLUVjXzJJNjg5bW9peGJIZzFfNDZDVFlGeEdZMDViaDluYm5Mcjl0RzY4In0.eyJqdGkiOiIyYjc1ODQ4NS0yMjBjLTRiMTItOWQ1Mi05ZjE2NDQ4MDY2MmQiLCJleHAiOjE1ODk4MjY3MDcsIm5iZiI6MCwiaWF0IjoxNTg3MjM0NzA3LCJpc3MiOiJodHRwczovL3NlY3VyZS56d2lmdC5jb20vYXV0aC9yZWFsbXMvendpZnQiLCJhdWQiOiJad2lmdF9Nb2JpbGVfTGluayIsInN1YiI6ImJhNWEyZjc3LWY3ZGItNDdiMi1hOWE1LTUxOWY0YzViNDFkZSIsInR5cCI6IlJlZnJlc2giLCJhenAiOiJad2lmdF9Nb2JpbGVfTGluayIsImF1dGhfdGltZSI6MCwic2Vzc2lvbl9zdGF0ZSI6ImE2MTllMWYxLWQ1ZDAtNDkyZC1hYTA1LTE1ZjE3MWI2ZTJmZSIsInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJldmVyeWJvZHkiLCJ0cmlhbC1zdWJzY3JpYmVyIiwiZXZlcnlvbmUiLCJiZXRhLXRlc3RlciJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImVtYWlsLXByZWZzLXNlcnZpY2UiOnsicm9sZXMiOlsiYXV0aGVudGljYXRlZC11c2VyIl19LCJteS16d2lmdCI6eyJyb2xlcyI6WyJhdXRoZW50aWNhdGVkLXVzZXIiXX0sIkdhbWVfTGF1bmNoZXIiOnsicm9sZXMiOlsiYXV0aGVudGljYXRlZC11c2VyIl19LCJzc28tZ2F0ZXdheSI6eyJyb2xlcyI6WyJhdXRoZW50aWNhdGVkLXVzZXIiXX0sInN1YnNjcmlwdGlvbi1zZXJ2aWNlIjp7InJvbGVzIjpbImF1dGhlbnRpY2F0ZWQtdXNlciJdfSwiWndpZnQgUkVTVCBBUEkgLS0gcHJvZHVjdGlvbiI6eyJyb2xlcyI6WyJhdXRob3JpemVkLXBsYXllciIsImF1dGhlbnRpY2F0ZWQtdXNlciJdfSwiWndpZnQgWmVuZGVzayI6eyJyb2xlcyI6WyJhdXRoZW50aWNhdGVkLXVzZXIiXX0sIlp3aWZ0IFJlbGF5IFJFU1QgQVBJIC0tIHByb2R1Y3Rpb24iOnsicm9sZXMiOlsiYXV0aG9yaXplZC1wbGF5ZXIiXX0sImVjb20tc2VydmVyIjp7InJvbGVzIjpbImF1dGhlbnRpY2F0ZWQtdXNlciJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fX0.WkDMjvHk3ZGE5Qn9WkgntSrQDtxm9e37HaAck0MprG9ugx5_jc_aHSn2aRLxMgHB35CQmLYfPrxIy0jHEMIacd14jZlhA1Zb0-P1vCqPhmonBkpEAwiYyB8avYGAmQBhgDBy1eJHnm0aPvXaCs6r-_1TjfLSftvkCfcMzOr-0UJS7ZfsBxLgpz1R2UIPaGr05aWh_AidBxeWVYaiyGmnARKdWobtG0GgDSgLGz1KFS5XeaCIoGccRoD3pZkIsURcCpMwN5oJOId2vNy3gQLQ0P6g0-p1UaGoIopV28fgK0Oz5SDu4X0Qd5Z60IYUCWFjXtb8WEVTNpbibdwKadyReQ";
	// let access_token: string = null;

	// app.use((req:express.Request, res: express.Response, next: express.NextFunction) => {
	// 	req.session.zwift_access_token = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJPLUVjXzJJNjg5bW9peGJIZzFfNDZDVFlGeEdZMDViaDluYm5Mcjl0RzY4In0.eyJqdGkiOiI1MDMzM2M4OS1kZjU2LTQ5NjctYWY4NC00ZGQxNzVkYjk5NDEiLCJleHAiOjE1ODcyNTYzMDcsIm5iZiI6MCwiaWF0IjoxNTg3MjM0NzA3LCJpc3MiOiJodHRwczovL3NlY3VyZS56d2lmdC5jb20vYXV0aC9yZWFsbXMvendpZnQiLCJhdWQiOiJad2lmdF9Nb2JpbGVfTGluayIsInN1YiI6ImJhNWEyZjc3LWY3ZGItNDdiMi1hOWE1LTUxOWY0YzViNDFkZSIsInR5cCI6IkJlYXJlciIsImF6cCI6Ilp3aWZ0X01vYmlsZV9MaW5rIiwiYXV0aF90aW1lIjowLCJzZXNzaW9uX3N0YXRlIjoiYTYxOWUxZjEtZDVkMC00OTJkLWFhMDUtMTVmMTcxYjZlMmZlIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6W10sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJldmVyeWJvZHkiLCJ0cmlhbC1zdWJzY3JpYmVyIiwiZXZlcnlvbmUiLCJiZXRhLXRlc3RlciJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImVtYWlsLXByZWZzLXNlcnZpY2UiOnsicm9sZXMiOlsiYXV0aGVudGljYXRlZC11c2VyIl19LCJteS16d2lmdCI6eyJyb2xlcyI6WyJhdXRoZW50aWNhdGVkLXVzZXIiXX0sIkdhbWVfTGF1bmNoZXIiOnsicm9sZXMiOlsiYXV0aGVudGljYXRlZC11c2VyIl19LCJzc28tZ2F0ZXdheSI6eyJyb2xlcyI6WyJhdXRoZW50aWNhdGVkLXVzZXIiXX0sInN1YnNjcmlwdGlvbi1zZXJ2aWNlIjp7InJvbGVzIjpbImF1dGhlbnRpY2F0ZWQtdXNlciJdfSwiWndpZnQgUkVTVCBBUEkgLS0gcHJvZHVjdGlvbiI6eyJyb2xlcyI6WyJhdXRob3JpemVkLXBsYXllciIsImF1dGhlbnRpY2F0ZWQtdXNlciJdfSwiWndpZnQgWmVuZGVzayI6eyJyb2xlcyI6WyJhdXRoZW50aWNhdGVkLXVzZXIiXX0sIlp3aWZ0IFJlbGF5IFJFU1QgQVBJIC0tIHByb2R1Y3Rpb24iOnsicm9sZXMiOlsiYXV0aG9yaXplZC1wbGF5ZXIiXX0sImVjb20tc2VydmVyIjp7InJvbGVzIjpbImF1dGhlbnRpY2F0ZWQtdXNlciJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwibmFtZSI6IkhlbnJ5IEhvIHtNQlBDK0xGVEN9IiwicHJlZmVycmVkX3VzZXJuYW1lIjoiaGVucnl5cC5ob0BnbWFpbC5jb20iLCJnaXZlbl9uYW1lIjoiSGVucnkiLCJmYW1pbHlfbmFtZSI6IkhvIHtNQlBDK0xGVEN9IiwiZW1haWwiOiJoZW5yeXlwLmhvQGdtYWlsLmNvbSJ9.Pbpqjaps43loTXmB-l7bK18oM-1zbmnTcOWyyaYHluk8J5A_ekwQue8DaXu_lYdquLyLzAJa3PSarf5buxTN0NtOidUKVFxrcZMhjolNbsARLmf9gevTiyX25OFDE3BzC9t7SW4mgjB-zcaTpMrEYFKobGwYssfBZqlWbF3ixNGtOt2vsbtK87X9-7VvvVbSbU9P3iCunk4fSLK49lbYNXSpYORN7a9_MgmPLtsVLU5JG-ZrqGxG3FwhGnfmCDm7_wKf-Vhu6mxLyQNC-XeT4bjR0rpdQeEqlNUR1WtMRSEMIrpY0hkMjaVkXQeb3NaTrGZQaBTM-gulg0b5MaNrtQ';
	// 	next();
	// });

	// if(isProdMode) {
	// 	// cron to get new access-token
	// 	zwiftService.refreshTokenLogin(refreshToken)
	// 	.then(res => {
	// 		access_token = res.access_token;
	// 		app.use((req:express.Request, res: express.Response) => {
	// 			req.session.zwift_access_token = access_token;
	// 			console.log('savedto session initial access token', access_token);
	// 		});
	// 		console.log('got initial access token', access_token);
	// 		getRelayWorldFeed(access_token)
	// 			.then(relayWorldData => RelayWorldModel.create(relayWorldData))
	// 			.then(() => { console.log('Added iniitial scheduled record') });
	// 	});

	// 	scheduler.add(1, '*/15 * * * *', () => {
	// 		console.log(`new Base Schedule for access tokenstarted for every pattern ${'*/15 * * * *'}`);
	// 		zwiftService.refreshTokenLogin(refreshToken)
	// 			.then(res => {
	// 				access_token = res.access_token;
	// 			});
	// 	});

	// 	scheduler.add(2, '*/3 * * * *', () => {
	// 		console.log(`new Base Schedule started for every pattern ${'*/3 * * * *'}`);
	// 		getRelayWorldFeed(access_token)
	// 			.then(relayWorldData => RelayWorldModel.create(relayWorldData))
	// 			.then(() => { console.log('Added another scheduled record') });
	// 	});
	// }
	// ------------------------------------------------------------



	registerRoutes(app);

	return app;
}