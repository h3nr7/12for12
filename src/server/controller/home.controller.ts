import express, { Request, Response } from 'express';
import * as loadjsonfile from "load-json-file";
import * as path from "path";

export const homeController = express.Router();

let webpackManifest: any = {};
const isProdMode = process.env.NODE_ENV === "production" || false;
if (isProdMode) {
    webpackManifest = loadjsonfile.sync(path.resolve(__dirname, "..", "..", "dist", "manifest.json"));
}

const renderFullPage = () => {
    return `<!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                <title>My App</title>
                <body>
                    <script src='${isProdMode ? webpackManifest["vendors.js"] : "/dist/vendors.bundle.js"}'></script>
                    <script src='${isProdMode ? webpackManifest["main.js"] : "/dist/bundle.js"}'></script>
                </body>
            </html>`;
};

homeController.get("/", (req: Request, res: Response) => {
    res.set("Content-Type", "text/html")
        .status(200)
        .end(renderFullPage());
});
