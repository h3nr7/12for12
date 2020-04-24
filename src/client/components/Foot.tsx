import * as React from "react";
import { hot } from "react-hot-loader";
import Container from '@material-ui/core/Container';

const FootComponent: React.StatelessComponent<{}> = (props) => {
    return (
    <div>
        <Container>Something {props.children}</Container>
    </div>
    );
}

export const Foot = hot(module)(FootComponent);