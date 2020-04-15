const webpack = require("webpack");
const path = require("path");
const nodeExternals = require("webpack-node-externals");
const webpackShellPlugin = require('webpack-shell-plugin');

module.exports = {
    entry: ["webpack/hot/poll?100", "./src/app.ts"],
    watch: true,
    target: "node",
    externals: [
        nodeExternals({
            whitelist: ["webpack/hot/poll?100"]
        })
    ],
    module: {
        rules: [
            {
                test: /.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/
            }
        ]
    },
    mode: "development",
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    devtool: "inline-source-map",
    devServer: {
        contentBase: "./dist",
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpackShellPlugin({ onBuildEnd: ["npm run serve:dev"]})
    ],
    output: {
        path: path.join(__dirname, "dist"),
        filename: "app.js",
        publicPath: "dist"
    }
};