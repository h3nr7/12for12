import * as React from "react";
import { hot } from "react-hot-loader";
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Typography, Button } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import MenuIcon from '@material-ui/icons/Menu';
import { IHead } from './Head.interface';
import { AppBar, Toolbar } from './Head.styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2),
        color: grey[50]
    },
    menuButtonInvert: {
        marginRight: theme.spacing(2),
        color: grey[100]
    },
    title: {
        flexGrow: 1
    }
}));

const HeadComponent: React.StatelessComponent<IHead> = (props) => {

    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar color="default">
                <Toolbar>
                    <IconButton edge="start" className={props.isInvertMenu ? classes.menuButton : classes.menuButtonInvert} aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    {/* <Typography variant="h6">LFTC 12 for 12 :: Masks for NHS Heroes</Typography> */}
                    {/* <Button color="inherit">Login</Button> */}
                    {props.children}
                </Toolbar>
            </AppBar>
        </div>
    );
}

export const Head = hot(module)(HeadComponent);