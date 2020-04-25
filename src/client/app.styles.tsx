import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, ListItem } from '@material-ui/core';
import { Link } from 'react-router-dom';
import heroImg from './assets/hero_img.jpg';

const drawerWidth:number = 240;

export const HeroContainer = styled.section`
    background-image: url(${heroImg});
    background-size: cover;
    background-position: center;
    background-color: rgba(0,0,0,0.5);
    background-blend-mode: multiply;
    display: flex;
    width: 100%;
    padding-top: 64px;
    height: 600px;
    overflow: hidden;
    @media (max-width: 960px) {
        height: 400px;
    }

    @media (max-width: 600px) {
        height: 400px;
    }

    @media (max-width: 400px) {
        height: 600px;
    }
`;

export const HeroHeading = styled.div`
    font-weight: bold;
    font-size: 2.6em;
    width: 800px;
    @media (max-width: 960px) {
        font-size: 2em;
        width: 600px;
    };

    @media (max-width: 600px) {
        font-size: 1.6em;
        width: 600px;
    };

    @media (max-width: 400px) {
        width: auto;
        font-size: 2.1em;
    };
    color: white;
`;


export const MenuItem = styled(ListItem)`
    font-size: 1.2em;
    font-weight: 500;
`;

export const MenuLink = styled(Link)`
    color: black;
    text-decoration: none;
    &:hover {
        cursor: pointer;
        text-decoration: underline;
    }
`;

export const useStyles = makeStyles((theme) => ({
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
    },
    pl1: {
        position: 'relative',
        top: 0,
        width: 'auto',
        [theme.breakpoints.down('xs')]: {
            height: 600
        }
    },
    pl2: {
        position: 'absolute',
        top: 0,
        left: 30,
        textAlign: 'left',
        width: 'auto',
        [theme.breakpoints.down('xs')]: {
            top: -100,
            left: 20,
        }
    }
}));