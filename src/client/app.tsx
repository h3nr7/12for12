import * as React from "react";
import { hot } from "react-hot-loader";
import Container from '@material-ui/core/Container';
import { Link } from "react-router-dom";
import { Head } from './components/Head';
import { Foot } from './components/Foot';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: theme.spacing(10)
    },
    menuButton: {
        // marginRight: theme.spacing(2)
    },
    container: {

    },
    title: {
        flexGrow: 1
    }
}));

const AppComponent: React.StatelessComponent<{}> = (props) => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Head />
            <Container className={classes.container}>
                { props.children }
            </Container>
            <Foot />
        </div>
    );
};

export const App = hot(module)(AppComponent);