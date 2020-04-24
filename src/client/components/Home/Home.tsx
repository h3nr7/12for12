import * as React from 'react';
import { hot } from 'react-hot-loader';
import { makeStyles } from '@material-ui/core/styles';
import { Parallax } from 'react-scroll-parallax';
import { IHome } from './home.interface';
import { Grid, Button } from '@material-ui/core';
import { 
    RootContainer, HeroContainer, 
    HeroHeading, JustGivingContainer, 
    DataContainer 
} from './Home.styles';
import { getAggStats,getPlayers, getCrowdfundingDetails } from '../../apis';
import Gallery from 'react-photo-gallery';
import Carousel, { Modal, ModalGateway } from "react-images";
import * as IGEmbed from 'react-instagram-embed';
import { RandomDigitor } from '../RandomDigitor/RandomDigitor';
import { photoSrc } from './photos';
import { callbackify } from 'util';

const useStyles = makeStyles((theme) => ({
    donateBut: {
        marginTop: 20,
        width: '60%',
        marginBottom: 30,
        background: '#fc035e',
        [theme.breakpoints.down('xs')]: {
            margin: '30px 20%'
        }
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

const HomeComponent: React.FunctionComponent = () => {

    const [curImg, setCurImg ] = React.useState(0);
    const [isViewOpen, setIsViewOpen] = React.useState(false);

    const openLightBox = React.useCallback((event, { photo, index}) => {
        setCurImg(index);
        setIsViewOpen(true);
    }, []);

    const closeLightBox = () => {
        setCurImg(0);
        setIsViewOpen(false);
    }

    const classes = useStyles();

    const [aggData, setAggData] = React.useState<IHome | null>({
        aggPlayers: 0,
        aggTotDistanceInMeters: 0,
        aggTotHeightInMeters: 0,
        aggTotTimeInMinutes: 0,
        aggTotCaloriesBurnt: 0,
        foodEarned: []
    });
    React.useEffect(() => {
        (async () => {
            const data = await getAggStats({});
            setAggData(data);
        })();
    }, []);

    const [players, setPlayers] = React.useState({
        data: [],
        pagination: {}
    });
    React.useEffect(() => {
        (async () => {
            const data = await getPlayers();
            setPlayers(data);
        })();
    }, []);

    const [crowdfundDetails, setCrowdfundDetails] = React.useState({
        amountRaised: 0,
        story: {
            problem: ''
        }
    });
    React.useEffect(() => {
        (async () => {
            const data = await getCrowdfundingDetails();
            setCrowdfundDetails(data);
        })();
    });

    const onClickHandler = () => {
        window.open('https://www.justgiving.com/crowdfunding/lftc12-for-12-challenge', '_blank');
    }


    return (
        <RootContainer>
            <Parallax className={classes.pl1}>
                <HeroContainer>  
                    
                </HeroContainer>
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
            <JustGivingContainer>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={5} md={4}>
                        <h2>LFTC 12 for 12 - Mask for NHS Heroes</h2>
                        <p>Donate now to provide Personal Protective Equipment (PPE) to protect healthcare workers</p>
                        <Button 
                            onClick={onClickHandler}
                            className={classes.donateBut}
                            color="primary" 
                            size="medium" 
                            variant="contained">link to just giving</Button>
                        <h2>Story</h2>
                        <p>On Saturday 18th April, some of the LFTC members will be cycling as far they can individually in the 12-for-12 challenge. That's 12 hours on turbo trainers (no outdoor cycling allowed unless it's static!) which is one hour for every hour of a standard shift for an NHS worker.</p>
                        <p>It's more time than any of us have ever spent continuously on a turbo trainer so will definitely be a challenge! We have many friends, teammates and family members working on the frontline so we want to do this to help to protect them and support existing campaigns raising money for PPE.</p>
                        <p>&nbsp;</p>
                        <h2>Can I watch or ride along for <br/>part of the challenge?</h2>
                        <p>Yes! We’d love to see as many of you as possible. We’ll be hosting a Zoom for the length of the challenge and if you want to pop in and ride on Zwift with us, we’d love to see you on there. We'll be setting up various meet ups throughout the 12 hours for people to pop in and pop out. Please see the LFTC website for more details:</p>
                        <p><a href="https://www.lftri.co.uk/events/lftc-12-for-12-challenge">https://www.lftri.co.uk/events/lftc-12-for-12-challenge</a></p>
                        <p>&nbsp;</p>
                        <p>We want to be very mindful of everyone’s health and wellbeing at this time. Please join the challenge only if you are fit to participate and prioritise safety, strenuous exercising can affect your immune system.</p>
                        <p>If you’d like to support us and in turn, support our frontline workers – please donate here!</p>
                        <p>Please note all donations made on this page will be sent directly to the Masks for NHS Heroes campaign.</p>
                        <p>&nbsp;</p>
                        <p><i>Thank you all and stay safe,</i></p>

                        <h3>LFTC</h3>
                    </Grid>
                    <Grid item xs={12} sm={7} md={8}>
                        <Gallery 
                            onClick={openLightBox}
                            photos={photoSrc}/>
                    </Grid>
                    {/* <Grid item xs={12} sm={7} md={8}>
                        <IGEmbed 
                            url=''/>
                    </Grid> */}
                </Grid>
                <ModalGateway>
                    {isViewOpen ? (
                        <Modal onClose={closeLightBox}>
                        <Carousel
                          currentIndex={curImg}
                          views={photoSrc.map(x => ({
                            ...x,
                            srcset: x.src,
                            // caption: x.title
                          }))}
                        />
                      </Modal>
                    ) : null}
                </ModalGateway>
            </JustGivingContainer>
        </RootContainer>
    );
};

export const Home = hot(module)(HomeComponent);

