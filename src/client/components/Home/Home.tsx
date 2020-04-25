import * as React from 'react';
import { hot } from 'react-hot-loader';
import { IHome } from './Home.interface';
import { Grid, Button } from '@material-ui/core';
import { 
    RootContainer, 
    JustGivingContainer, 
    DataContainer 
} from './Home.styles';
import Gallery from 'react-photo-gallery';
import Carousel, { Modal, ModalGateway } from "react-images";
import * as IGEmbed from 'react-instagram-embed';
import { photoSrc } from './photos';
import { useStyles } from './Home.styles';

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

    const onClickHandler = () => {
        window.open('https://www.justgiving.com/crowdfunding/lftc12-for-12-challenge', '_blank');
    }

    return (
        <RootContainer>
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

