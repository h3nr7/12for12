import * as React from 'react';
import { hot } from 'react-hot-loader';
import IGEmbed from 'react-instagram-embed';

import { IMedia } from './Media.interface';
import { RootContainer, useStyles } from './Media.styles';
import { Grid, List, ListItem } from '@material-ui/core';

const MediaComponent: React.FunctionComponent<IMedia> = (props) => {

    const classes = useStyles();

    return (
        <RootContainer>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={12} md={6} lg={7}>
                    <h2>Media</h2>
                    <List>
                        <ListItem className={classes.listitem}>
                            <span>
                                Hackney Gazette:<br/>
                                <a href="https://www.hackneygazette.co.uk/sport/local-heroes-london-fields-triathlon-club-members-cycle-indoors-for-nhs-staff-1-6615955" target="hackney_gazette">News on Hackney Gazette</a>
                            </span>
                        </ListItem>
                        <ListItem className={classes.listitem}>
                            <span>
                                British Triahthlon:<br/>
                                <a href="https://www.britishtriathlon.org/news/12-hours-of-indoor-cycling-and-%C2%A312%2C000-for-the-nhs_13839" target="british_triathlon">News on British Triathlon</a>
                            </span>
                        </ListItem>
                        <ListItem className={classes.listitem}>
                            <span>
                                Message from Alex Yee:<br/>
                                <a href="https://www.facebook.com/141593512572016/posts/3008442762553729/?vh=e" target="facebook">Facebook link</a>
                            </span>
                        </ListItem>
                        <ListItem className={classes.listitem}>
                            <span>
                                Our Just giving page:<br/>
                                <a href="https://www.justgiving.com/crowdfunding/lftc12-for-12-challenge?utm_term=8BERdDVw8">
                                    Page on justgiving.com
                                </a>
                            </span>
                        </ListItem>
                        <ListItem className={classes.listitem}>
                            <span>
                                Masks for NHS Heroes crowdfunding page:<br/>
                                <a href="https://www.crowdfunder.co.uk/masks4nhsheroes">
                                Page on crowdfunder.co.uk
                                </a>
                            </span>
                        </ListItem>
                    </List>
                </Grid> 
                <Grid item xs={12} sm={12} md={6} lg={5}>
                    
                    <IGEmbed 
                        url='https://www.instagram.com/p/B_LBV-UBmpg/?utm_source=ig_embed&amp;utm_campaign=loading'/>
                </Grid>
            </Grid>
        </RootContainer>
    );
};

export const Media = hot(module)(MediaComponent);