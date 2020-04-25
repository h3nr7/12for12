import * as express from 'express';
import * as loadjsonfile from "load-json-file";
import * as path from "path";

export const homeController = express.Router();

const isDevMode = process.env.NODE_ENV === "development" || false;
const isProdMode = process.env.NODE_ENV === "production" || false;
let webpackManifest: any = {};
if (isProdMode) {
    webpackManifest = loadjsonfile.sync(path.resolve(__dirname, "..", "..", "dist", "manifest.json"));
}

const renderFullPage = () => {
    return `<!DOCTYPE html>
            <html>
            <head>
                <!-- Global site tag (gtag.js) - Google Analytics -->
                <script async src="https://www.googletagmanager.com/gtag/js?id=UA-163890805-1"></script>
                <script>
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                
                gtag('config', 'UA-163890805-1');
                </script>            
                <meta charset="utf-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
                <link rel="icon" type="image/png" href='${isProdMode ? webpackManifest["favicon-32x32.png"] : "/dist/favicon-32x32.png"}'>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                <title>LFTC 12 for 12 :: Masks for NHS Heroes</title>
                <body>
                    <script src='${isProdMode ? webpackManifest["vendors.js"] : "/dist/vendors.bundle.js"}'></script>
                    <script src='${isProdMode ? webpackManifest["main.js"] : "/dist/bundle.js"}'></script>
                </body>
            </html>`;
};

homeController.get("/", (req: express.Request, res: express.Response) => {
    res.set("Content-Type", "text/html")
        .status(200)
        .end(renderFullPage());
});
