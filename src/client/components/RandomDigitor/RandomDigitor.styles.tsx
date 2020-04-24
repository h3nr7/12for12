import * as React from 'react';
import { IRandomDigitor } from './RandomDigitor.interface';
import { hot } from 'react-hot-loader';
import { Grid } from '@material-ui/core';

const RandomDigitorComp:React. FunctionComponent = (props:{ numDisplay: string }={numDisplay:''}) => {

    return (
        <Grid container>
            <Grid item xs={2}></Grid>
            <Grid item xs={8}>
                adsf
            </Grid>
            <Grid item xs={2}></Grid>
        </Grid>
    );
}

export const RandomDigitor = hot(module)(RandomDigitorComp);