const webpack = require("webpack");
const path = require("path");
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin');
const {
    rootFolder,
    sourceFolder,
    clientFolder,
    commonFolder,
    tsConfigFile,
    entryPointIndexTsx,
    materialUiFolder,
    prodDistOutputFolder
} = require("./paths");


module.exports = {
    mode: "development",
    watch: true,
    watchOptions: {
        poll: 1000 // Check for changes every second
    },
    devtool: "inline-source-map",
    entry: [
        "babel-polyfill",
        "react-hot-loader/patch",
        "webpack-hot-middleware/client",
        entryPointIndexTsx
    ],
    output: {
        path: prodDistOutputFolder,
        publicPath: "/dist/",
        filename: "bundle.js",
        pathinfo: false
    },
    resolve: {
        extensions: [".ts", ".js", ".jsx", ".tsx"]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ForkTsCheckerWebpackPlugin({
            tslint: true,
            checkSyntacticErrors: true,
            tsconfig: tsConfigFile,
            watch: ["./src/client", "./src/common"]
        }),
        new ForkTsCheckerNotifierWebpackPlugin({ title: 'TypeScript', excludeWarnings: true })
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "all"
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                include: [
                    clientFolder,
                    commonFolder
                ],
                exclude: path.resolve(process.cwd(), 'node_modules'),
                use: [
                    { loader: 'cache-loader' },
                    {
                        loader: 'thread-loader',
                        options: {
                            // there should be 1 cpu for the fork-ts-checker-webpack-plugin
                            workers: require('os').cpus().length - 1,
                        },
                    },
                    {
                        loader: "ts-loader",
                        query: {
                            happyPackMode: true,
                            configFile: tsConfigFile,
                        },
                    }
                ]
            },
            {
                test: /\.(scss|css)$/,
                loaders: ["sass-loader", "style-loader", "css-loader"],
                include: [/** paths to node_module or external css */]          
            },
            {
                test: /\.(jpe?g|gif|png|svg)$/i,
                loader: "url-loader?limit=10000",
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file-loader",
                include: [/** paths to node_module or external css */] 
            },
            {
                test: /\.(woff|woff2)$/,
                loader: "url-loader?prefix=font/&limit=5000",
                include: [/** paths to node_module or external css */]
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader?limit=10000&mimetype=application/octet-stream",
                include: [/** paths to node_module or external css */]
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader?limit=10000&mimetype=image/svg+xml",
                include: [/** paths to node_module or external css */]
            }
        ]
    }    
};

// const webpack = require("webpack");

// const path = require("path");
// const nodeExternals = require("webpack-node-externals");
// const webpackShellPlugin = require('webpack-shell-plugin');

// module.exports = {
//     entry: ["webpack/hot/poll?100", "./src/app.ts"],
//     watch: true,
//     target: "node",
//     externals: [
//         nodeExternals({
//             whitelist: ["webpack/hot/poll?100"]
//         })
//     ],
//     module: {
//         rules: [
//             {
//                 test: /.tsx?$/,
//                 use: "ts-loader",
//                 exclude: /node_modules/
//             }
//         ]
//     },
//     mode: "development",
//     resolve: {
//         extensions: [".tsx", ".ts", ".js"]
//     },
//     devtool: "inline-source-map",
//     devServer: {
//         contentBase: "../../dist",
//     },
//     plugins: [
//         new webpack.HotModuleReplacementPlugin(),
//         new webpackShellPlugin({ onBuildEnd: ["npm run serve"]})
//     ],
//     output: {
//         path: path.join(__dirname, "dist"),
//         filename: "app.js",
//         publicPath: "dist"
//     }
// };