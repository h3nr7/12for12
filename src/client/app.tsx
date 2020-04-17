import * as React from "react";
import { hot } from "react-hot-loader";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import { Link } from "react-router-dom";

const AppComponent: React.StatelessComponent<{}> = (props) => {
    return (
        <Container>
            <Card>
                <h1>Hello</h1>
            </Card>
        </Container>
    );
};

export const App = hot(module)(AppComponent);