import * as React from 'react';
import { IRandomDigitor } from './RandomDigitor.interface';
import { hot } from 'react-hot-loader';
import { Grid } from '@material-ui/core';
import { Easing } from '../../libs/easing';

const useAnimFrame = (cb:(t: number) => void, duration:number, delay:number = 0) => {
    const requestRef = React.useRef<number>();
    const prevTimeRef = React.useRef<number>();

    const animate = (time:number) => {
        const deltaTime = time >= delay ? time - (prevTimeRef.current || 0) : 0;
        cb(deltaTime);

        prevTimeRef.current = time;
        if(time <= (duration+delay)) {
            requestRef.current = requestAnimationFrame(animate);
        }
    }

    React.useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current);
    }, []);
}

const RandomDigitorComp:React.FunctionComponent<IRandomDigitor> = ({ value, duration, delay }) => {

    const [ numRatio, setNumRatio ] = React.useState(0);
    useAnimFrame(deltaTime => 
        setNumRatio((num: number) => (num + deltaTime/duration)), 
        duration, delay
    );
    

    return (
        <span>{Math.floor(value * Easing.easeInOutCubic(numRatio)).toLocaleString()}</span>
    );
}

export const RandomDigitor = hot(module)(RandomDigitorComp);