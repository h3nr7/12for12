import * as React from "react";
import { hot } from "react-hot-loader";
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { Container, Card, CardContent, Grid } from '@material-ui/core';
import { ResponsiveAreaBump } from '@nivo/bump'
import * as api from "../apis";
import { eventsData } from '../data/12for12-events';
import { playerData } from '../data/12for12-players';


const dummyData: Array<any> = [
    {
      "id": "JavaScript",
      "data": [
        {
          "x": 2000,
          "y": 10
        },
        {
          "x": 2001,
          "y": 19
        },
        {
          "x": 2002,
          "y": 10
        },
        {
          "x": 2003,
          "y": 13
        },
        {
          "x": 2004,
          "y": 14
        },
        {
          "x": 2005,
          "y": 24
        }
      ]
    },
    {
      "id": "ReasonML",
      "data": [
        {
          "x": 2000,
          "y": 26
        },
        {
          "x": 2001,
          "y": 24
        },
        {
          "x": 2002,
          "y": 29
        },
        {
          "x": 2003,
          "y": 26
        },
        {
          "x": 2004,
          "y": 12
        },
        {
          "x": 2005,
          "y": 23
        }
      ]
    },
    {
      "id": "TypeScript",
      "data": [
        {
          "x": 2000,
          "y": 20
        },
        {
          "x": 2001,
          "y": 19
        },
        {
          "x": 2002,
          "y": 27
        },
        {
          "x": 2003,
          "y": 13
        },
        {
          "x": 2004,
          "y": 29
        },
        {
          "x": 2005,
          "y": 29
        }
      ]
    },
    {
      "id": "Elm",
      "data": [
        {
          "x": 2000,
          "y": 15
        },
        {
          "x": 2001,
          "y": 15
        },
        {
          "x": 2002,
          "y": 14
        },
        {
          "x": 2003,
          "y": 24
        },
        {
          "x": 2004,
          "y": 30
        },
        {
          "x": 2005,
          "y": 15
        }
      ]
    },
    {
      "id": "CoffeeScript",
      "data": [
        {
          "x": 2000,
          "y": 24
        },
        {
          "x": 2001,
          "y": 10
        },
        {
          "x": 2002,
          "y": 23
        },
        {
          "x": 2003,
          "y": 25
        },
        {
          "x": 2004,
          "y": 15
        },
        {
          "x": 2005,
          "y": 27
        }
      ]
    }
  ]

const CustomResponsiveBump = ({data}: {data: Array<any>}) => (
    <ResponsiveAreaBump
        data={data}
        margin={{ top: 40, right: 100, bottom: 40, left: 100 }}
        align="end"
        spacing={36}
        xPadding={0.35}
        colors={{ scheme: 'nivo' }}
        blendMode="multiply"
        fillOpacity={0.6}
        inactiveFillOpacity={0.25}
        activeBorderWidth={4}
        borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.4 ] ] }}
        startLabel="id"
        startLabelPadding={6}
        startLabelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1 ] ] }}
        axisTop={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '',
            legendPosition: 'middle',
            legendOffset: -36
        }}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '',
            legendPosition: 'middle',
            legendOffset: 32
        }}
    />
)



class HomeComponent extends React.Component<{}> {

    render() {
        return(
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Card style={{height: 380}}>
                        <CustomResponsiveBump data={dummyData} />
                    </Card>
                </Grid>
                <Grid item xs={9}>
                    <Card style={{height: 200}}>
                        <CardContent>
                        what
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={3}>
                    <Card style={{height: 200}}>
                        <CardContent>
                            what
                        </CardContent>
                    </Card>
                </Grid>
            
            </Grid>
        );
    }

}

export const Home = hot(module)(HomeComponent);