import * as React from "react";
import { hot } from "react-hot-loader";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Container, Card, CardContent, Grid, CardHeader, Typography, List, ListItem } from '@material-ui/core';
import { ResponsiveScatterPlot } from '@nivo/scatterplot'
import * as api from "../apis";
import { eventsData } from '../data/12for12-events';
import { playerData } from '../data/12for12-players';
import { getLatestSavedFeed, getAggregatedFeed } from '../apis';
import { NODATA } from "dns";

const CustomScatteredPlot = ({data}: {data: Array<any>}) => {

  let outData = data[0].arrFriends.map(o => ({
    id: `${o.firstName} ${o.lastName}`,
    data: [{
      x: o.aggDistanceInMeters,
      y: o.aggTimeInMinutes
    }]
  }));

  console.log(outData);

  return <ResponsiveScatterPlot
      data={outData}
      margin={{ top: 30, right: 200, bottom: 60, left: 60 }} 
      xFormat={(e) => {return `${String(Math.round(e/1000))}KM`}}
      yFormat={(e) => {return `${String(Math.floor(e/60))}HOUR ${String(e%60)}MINS`}} 
      blendMode="multiply"
      axisLeft={{
        orient: 'right',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Time (minutes)',
        legendPosition: 'start',
        legendOffset: -40
    }}
    axisBottom={{
        orient: 'bottom',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Distance (meters)',
        legendPosition: 'start',
        legendOffset: 40
    }}
    legends={[
        {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 120,
            translateY: 0,
            itemWidth: 100,
            itemHeight: 12,
            itemsSpacing: 5,
            itemDirection: 'left-to-right',
            symbolSize: 12,
            symbolShape: 'circle',
            effects: [
                {
                    on: 'hover',
                    style: {
                        itemOpacity: 1
                    }
                }
            ]
        }
    ]}
    nodeSize={nDat=>{
      return Math.random() * Math.max(1, nDat.y/250) * Math.exp(0.00065*nDat.x/nDat.y) * Math.exp(0.006*nDat.x/nDat.y);
    }}
   />
  };

function getUserData(listen:boolean=true) {
  let [data, setData] = useState({arrFriends: []});
  useEffect(() => {
    getAggregatedFeed()
        .then(d => {
          const arrFriends = Object.keys(d.friendsInWorld).map(i => d.friendsInWorld[i]) || [];
          return setData({...d, arrFriends});
        });
    setInterval(() => {
      getAggregatedFeed()
        .then(d => {
          const arrFriends = Object.keys(d.friendsInWorld).map(i => d.friendsInWorld[i]) || [];
          return setData({...d, arrFriends});
        });
    },30000);
  }, [listen]);
  return data;
}

function AggUserData({listen, children}) {
  let data = getUserData(listen);
  return children(data);
}


class HomeComponent extends React.Component<{}> {

    render() {
  
      return(
          <Grid container spacing={3}>
              <Grid item xs={12}>
                  <Card style={{height: 480}}>
                    <AggUserData>
                      {(obj) => {
                        return <CustomScatteredPlot data={[obj]} />
                      }}
                      </AggUserData>
                  </Card>
              </Grid>
              <Grid item xs={4}>
                  <Card style={{height: 'auto'}}>
                      <CardContent>
                      <Typography variant="h6" component="h2">
                        Most climb so far
                      </Typography>
                      <List>
                        <AggUserData>
                          {(obj) => {
                            let friends = [...obj.arrFriends];
                            friends.sort((b, a) => Number(a.aggregatedStats.heightClimbedInMeters) - Number(b.aggregatedStats.heightClimbedInMeters));
                            return friends.map(o => (
                              <ListItem key={o.id}>
                                <Grid container>
                                  <Grid xs={10}>{o.firstName} {o.lastName}</Grid> 
                                  <Grid xs={2}>{o.aggregatedStats.heightClimbedInMeters}m</Grid>
                                </Grid>
                              </ListItem>
                            ));
                          }
                        </AggUserData>
                      </List>
                      </CardContent>
                  </Card>
              </Grid>
              <Grid item xs={4}>
              <Card style={{height: 'auto'}}>
                  <CardContent>
                  <Typography variant="h6" component="h2">
                        Longest distance
                      </Typography>
                      <List>
                        <AggUserData>
                          {(obj) => {
                            let friends = [...obj.arrFriends];
                            friends.sort((b, a) => Number(a.aggDistanceInMeters) - Number(b.aggDistanceInMeters));
                            return friends.map(o => (
                              <ListItem key={o.id}>
                                <Grid container>
                                  <Grid xs={10}>{o.firstName} {o.lastName}</Grid> 
                                  <Grid xs={2}>{Math.round(o.aggDistanceInMeters/100)/10}km</Grid>
                                </Grid>
                              </ListItem>
                            ));
                          }
                        </AggUserData>
                      </List>
                  </CardContent>
              </Card>
          </Grid>
          <Grid item xs={4}>
            <Card style={{height: 'auto'}}>
                <CardContent>
                <Typography variant="h6" component="h2">
                        Longest time
                      </Typography>
                      <List>
                        <AggUserData>
                          {(obj) => {
                            let friends = [...obj.arrFriends];
                            friends.sort((b, a) => Number(a.aggTimeInMinutes) - Number(b.aggTimeInMinutes));
                            return friends.map(o => (
                              <ListItem key={o.id}>
                                <Grid container>
                                  <Grid xs={10}>{o.firstName} {o.lastName}</Grid> 
                                  <Grid xs={2}>{Math.round(o.aggTimeInMinutes/60)}:{String(o.aggTimeInMinutes%60).padStart(2, '0')}</Grid>
                                </Grid>
                              </ListItem>
                            ));
                          }
                        </AggUserData>
                      </List>
                </CardContent>
            </Card>
            <Container>

            </Container>
          </Grid>
        </Grid>
      );
    }

}

export const Home = hot(module)(HomeComponent);