import * as React from "react";
import { hot } from "react-hot-loader";
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Typography, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { AppBar, Toolbar } from './Head.styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1
    }
}));

const HeadComponent: React.StatelessComponent<{}> = (props) => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar color="default">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6">LFTC 12 for 12 :: Masks for NHS Heroes</Typography>
                    {/* <Button color="inherit">Login</Button> */}
                    {props.children}
                </Toolbar>
            </AppBar>
        </div>
    );
}

export const Head = hot(module)(HeadComponent);