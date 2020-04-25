import * as React from 'react';
import { hot } from 'react-hot-loader';

import { getPlayers } from '../../apis';
import { IParticipants, IParticipant } from '../../../shared/interfaces/IParticipants';
import { 
    RootContainer, CardText, CardAvatar,
    CardNameField, CardDesc, useStyles } from './Participants.styles';
import { ListItem, List, Grid, Card, CardContent, Typography, TextField } from '@material-ui/core';


const PlayerCard: React.StatelessComponent<IParticipant & { className: string }> = (({
    isAgreedToShare, firstName, lastName, imageSrc,
    aggregatedStats, isNonZwift, className}) => (
    <Card className={className}>
        <CardContent>
            <CardNameField variant="h6" color="textSecondary">
                {isAgreedToShare ? <span>{firstName} {lastName}</span> : <span>Anonymous</span>}
            </CardNameField>
            <Grid container>
                <Grid item xs={12} sm={3} md={3}>
                    <CardAvatar alt={firstName} src={isAgreedToShare ? imageSrc : null} />
                </Grid>
                <Grid item xs={6} sm={6} md={5}>
                    <CardDesc color="primary">Elevations:</CardDesc>
                    <CardText>{Math.round(aggregatedStats.heightClimbedInMeters).toLocaleString()}m</CardText>
                    <CardDesc color="primary">Elapsed time:</CardDesc>
                    <CardText>
                        {Math.floor(aggregatedStats.timeRiddenInMinutes/60)}:
                        {(aggregatedStats.timeRiddenInMinutes%60).toString().padStart(2, '0')}
                    </CardText>
                    <CardDesc color="primary">On Zwift:</CardDesc>
                    <CardText>{isNonZwift ? 'No' : 'Yes'}</CardText>
                </Grid>
                <Grid item xs={6} sm={3} md={4}>
                    <CardDesc color="primary">Distance:</CardDesc>
                    <Typography variant="h5" color="textPrimary">
                        {Math.round(aggregatedStats.distanceRiddenInMeters/1000).toLocaleString()}km
                    </Typography>
                    <CardDesc color="primary">Burnt:</CardDesc>
                    <CardText>
                        <b>{Math.round(aggregatedStats.caloriesBurned).toLocaleString()} kcal</b>
                    </CardText>
                </Grid>
            </Grid>
            
        </CardContent> 
    </Card>
));

const ParticipantsComp: React.FunctionComponent = (props => {

    const classes = useStyles();

    const [players, setPlayers] = React.useState<IParticipants>({
        data: [],
        pagination: {
            hasPrevPage: null,
            hasNextPage: null,
            prevPage: null,        
            nextPage: null,
            perPage: 100,
            page: 1
        }
    });
    React.useEffect(() => {
        (async () => {
            const data = await getPlayers();
            setPlayers(data);
        })();
    }, []);

    const [filteredPlayers, setFilteredPlayers] = React.useState<IParticipants>({
        data:[],
        pagination: {
            hasPrevPage: null,
            hasNextPage: null,
            prevPage: null,        
            nextPage: null,
            perPage: 100,
            page: 1
        }
    });
    React.useEffect(() => {
        setFilteredPlayers(players);
    }, [players])

    const playerFiltering = (terms:string):IParticipants => {
        const newData = players.data.filter((p:IParticipant) => 
            p.firstName.toLowerCase().indexOf(terms.toLowerCase()) !== -1);
        return { ...players, data: newData };
    }

    const searchHandler = (event: any) => {
        setFilteredPlayers(playerFiltering(event.target.value));
    };

    return (
        <RootContainer>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={12} md={6} lg={7}>
                    <h2>Participants</h2>
                    <p>Let's find out how much calories each participant has burnt.</p>
                    <TextField
                    className={classes.searchField}
                    onChange={searchHandler} 
                    fullWidth id="search-player" 
                    label="Search" 
                    variant="outlined" />
                    <Typography color="textSecondary" variant="caption">
                        note: please contact Henry of London Fields Triathlon Club in regards to any information shared on this list.
                    </Typography>
                </Grid>
                <Grid xs={12} sm={12} md={6} lg={5} item>
                {filteredPlayers.data.sort((a:IParticipant, b:IParticipant) => a.firstName.localeCompare(b.firstName)).map((props:IParticipant) => ( 
                    <PlayerCard className={classes.playerCard} {...props} key={props.lastName}/>
                ))}
                </Grid>
            </Grid>
        </RootContainer>
    );
});

export const Participants = hot(module)(ParticipantsComp)