import * as React from "react";
import { hot } from "react-hot-loader";
import Container from '@material-ui/core/Container';

const AuthComponent: React.StatelessComponent<{}> = (props) => {
    return (
    <Container>{props.children}</Container>
    );
}

export const Auth = hot(module)(AuthComponent);