import * as React from "react";
import { hot } from "react-hot-loader";
import { Container } from './Foot.styles';

const FootComponent: React.StatelessComponent<{}> = (props) => {
    return (
        <Container>&nbsp;{props.children}</Container>
    );
}

export const Foot = hot(module)(FootComponent);