import * as React from "react";
import { hot } from "react-hot-loader";
import Container from '@material-ui/core/Container';
import { Link } from "react-router-dom";
import { Head } from './components/Head/Head';
import { Foot } from './components/Foot/Foot';
import { makeStyles } from '@material-ui/core/styles';
import { Heading } from './app.styles';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 1920,
        minWidth: 600,
        margin: '0 auto',
        [theme.breakpoints.down('sm')]: {
            minWidth: 'auto'
        }
    },
    menuButton: {
        // marginRight: theme.spacing(2)
    },
    container: {
        margin: 0,
        padding: 0
    },
    title: {
        flexGrow: 1
    }
}));

const AppComponent: React.StatelessComponent<{}> = (props) => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Head isInvertMenu={true} />
            <div className={classes.container}>
                { props.children }
            </div>
            <Foot />
        </div>
    );
};

export const App = hot(module)(AppComponent);