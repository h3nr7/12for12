import * as React from "react";
import { hot } from "react-hot-loader";
import Container from '@material-ui/core/Container';
import { Head } from './components/Head/Head';
import { Foot } from './components/Foot/Foot';
import { makeStyles } from '@material-ui/core/styles';
import { Heading, MenuLink as Link, MenuItem as ListItem } from './app.styles';
import { Drawer, List, ListItem, Typography } from "@material-ui/core";

const drawerWidth:number = 240;
const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 1920,
        minWidth: 600,
        margin: '0 auto',
        [theme.breakpoints.down('sm')]: {
            minWidth: 'auto'
        }
    },
    menu: {
        width: drawerWidth,
        paddingTop: theme.spacing(8)
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
    },
    content: {
        transition: theme.transitions.create('transform', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        transform: 'translate(0,0)'
    },
    contentShift: {
        transition: theme.transitions.create('transform', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        transform: `translate(${drawerWidth}px, 0)`
    }
}));

const AppComponent: React.StatelessComponent<{}> = (props) => {

    const classes = useStyles();
    const [ isDrawerOpen, setIsDrawerOpen ] = React.useState(false);

    const menuClickHandler = (event: any) => {
        setIsDrawerOpen(!isDrawerOpen);
    }

    return (
        <div className={classes.root}>
            <Drawer 
                onClose={() => setIsDrawerOpen(false)}
                open={isDrawerOpen}>
                <List className={classes.menu}>
                    <ListItem variant='h6'>
                        <Link to='/organisers'>Organisers</Link>
                    </ListItem>
                    <ListItem variant='h6'>
                        <Link to='/participants'>Participants</Link>
                    </ListItem>
                    <ListItem variant='h6'>
                        <Link to='/media'>Media</Link>
                    </ListItem>

                </List>
            </Drawer>
            <div className={isDrawerOpen ? classes.contentShift : classes.content}>
                <Head isInvertMenu={true} onMenuClick={menuClickHandler} />
                <div className={classes.container}>
                    { props.children }
                </div>
                <Foot />
            </div>
        </div>
    );
};

export const App = hot(module)(AppComponent);