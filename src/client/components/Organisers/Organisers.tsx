import * as React from 'react';
import { hot } from 'react-hot-loader';
import { IOrganisers } from './Organisers.interface';
import { RootContainer } from './Organisers.styles';
import { Grid } from '@material-ui/core';
import { useStyles } from './Organisers.styles';
import Youtube from 'react-youtube';

const OrganisersComp: React.FunctionComponent<IOrganisers> = (props) => {
    
    const classes = useStyles();

    return (
        <RootContainer>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={12} md={6} lg={7}>
                    <h2>Organisers</h2>
                    <p>
                        Organised by Charlotte Bell of London Fields Triathlon Club, with the collective effort of their members.  
                        This is in response to the crowd funding project by <b>"Masks for NHS Heroes"</b>. 
                    </p>
                    <p>
                    They are raising funds to provide Personal Protective Equipment (PPE) to protect healthcare workers against the Coronavirus while caring for sick patients.
                    </p>
                    <p>&nbsp;</p>
                    <p>
                        For more information on progress and updates, please visit their official 
                        page:
                    </p>
                    <p><a href="https://www.crowdfunder.co.uk/masks4nhsheroes" target="masksfornhsheroes">https://www.crowdfunder.co.uk/masks4nhsheroes</a></p>
                    <p>&nbsp;</p>
                    <p>For more information about the our event:</p>
                    <p><a href="https://www.lftri.co.uk/events/lftc-12-for-12-challenge" target="lftc">https://www.lftri.co.uk/events/lftc-12-for-12-challenge</a></p>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={5} className={classes.ytContainer}>
                    <Youtube
                        videoId='4yKsbx2lTfQ'
                        className={classes.ytPlayer}/>
                </Grid>
            </Grid>            
        </RootContainer>
    );
}

export const Organisers = hot(module)(OrganisersComp);