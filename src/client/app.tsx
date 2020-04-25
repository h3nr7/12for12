import * as React from "react";
import { hot } from "react-hot-loader";
import { Parallax } from 'react-scroll-parallax';

import { IApp } from './app.interface';
import { Head } from './components/Head/Head';
import { Foot } from './components/Foot/Foot';
import { makeStyles } from '@material-ui/core/styles';
import { HeroContainer, HeroHeading,
    MenuLink as Link, MenuItem as ListItem,
    useStyles
} from './app.styles';
import { Drawer, List, Typography } from "@material-ui/core";
import { RandomDigitor } from './components/RandomDigitor/RandomDigitor';
import { getAggStats, getCrowdfundingDetails } from './apis';
import { animateScroll  } from 'react-scroll';

const AppComponent: React.StatelessComponent<{}> = (props) => {


    const classes = useStyles();

    const [crowdfundDetails, setCrowdfundDetails] = React.useState({
        id: null,
        amountRaised: 0,
        story: null
    });
    React.useEffect(() => {
        (async () => {
            const data = await getCrowdfundingDetails();
            setCrowdfundDetails(data);
        })();
    }, [crowdfundDetails.id]);

    const [aggData, setAggData] = React.useState<IApp | null>({
        aggPlayers: 0,
        aggTotDistanceInMeters: 0,
        aggTotHeightInMeters: 0,
        aggTotTimeInMinutes: 0,
        aggTotCaloriesBurnt: 0,
        foodEarned: []
    });
    React.useEffect(() => {
        (async () => {
            const data = await getAggStats(null);
            setAggData(data);
        })();
    }, [aggData.aggPlayers]);

    const [ isDrawerOpen, setIsDrawerOpen ] = React.useState(false);

    const openDrawerHandler = (event: any) => {
        setIsDrawerOpen(true);
        animateScroll.scrollTo(600, {
            duration: 800,
            delay: 0,
            smooth: "easeInOutQuart",
            // offset: offset
          });
    }

    const closeDrawerHandler = (event: any) => {
        setIsDrawerOpen(false);
        animateScroll.scrollTo(0, {
            duration: 800,
            delay: 0,
            smooth: "easeInOutQuart",
            // offset: offset
          });
    }

    return (
        <div className={classes.root}>
            <Drawer 
                onClose={closeDrawerHandler}
                open={isDrawerOpen}>
                <List className={classes.menu}>
                    <ListItem variant='h6'>
                        <Link to='/'>Home</Link>
                    </ListItem>
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
                <Head isInvertMenu={true} onMenuClick={openDrawerHandler} />
                <div className={classes.container}>
                    <Parallax className={classes.pl1}>
                        <HeroContainer />
                    </Parallax>
                    <Parallax y={[400, 0]} className={classes.pl2}>
                        <HeroHeading>Thanks to your support.  We have raised<br/>
                            a total of &pound;<RandomDigitor 
                            value={Number(crowdfundDetails.amountRaised)}
                            delay={0} 
                            duration={3000} />, ridden <RandomDigitor 
                            value={Math.round(aggData.aggTotDistanceInMeters/1000)}
                            delay={2500} 
                            duration={3000} />km,<br/>
                            climbed <RandomDigitor 
                            value={Math.round(aggData.aggTotHeightInMeters)}
                            delay={5000} 
                            duration={3000} />m and burnt <RandomDigitor 
                            value={Math.round(aggData.aggTotCaloriesBurnt)}
                            delay={7500} 
                            duration={3000} /> calories<br/>
                            to support Masks for NHS Heroes.
                        </HeroHeading>
                    </Parallax>
                </div>
                { props.children }
                <Foot />
            </div>
        </div>
    );
};

export const App = hot(module)(AppComponent);