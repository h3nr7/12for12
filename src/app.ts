/** Required modules */
import express from 'express';
import * as dotenv from 'dotenv';
import cors from "cors";
import helmet from "helmet";

import { usersRouter } from "./model/users/users.router";

if(process.env.NODE_ENV !== 'production') {
	dotenv.config();
}

/**  App variables */
const PORT: number = parseInt(process.env.PORT as string, 10);

/** App config */
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/users", usersRouter);

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