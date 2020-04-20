import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { App } from "./app";
import { hot } from "react-hot-loader";
import { Stats } from './components/Stats/Stats';
import { Home } from './components/Home/Home';
import { Auth } from './components/Auth';

const AppRouterComponent: React.StatelessComponent<{}> = () => {
    return (
        <BrowserRouter>
            <App>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/stats" component={Stats} />
                    <Route path="auth" component={Auth} />
                </Switch>
            </App>
        </BrowserRouter>
    );
};

export const AppRouter = hot(module)(AppRouterComponent);