import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { App } from "./app";
import { hot } from "react-hot-loader";

const AppRouterComponent: React.StatelessComponent<{}> = () => {
    return (
        <BrowserRouter>
            <App>
                <Switch>

                </Switch>
            </App>
        </BrowserRouter>
    );
};

export const AppRouter = hot(module)(AppRouterComponent);