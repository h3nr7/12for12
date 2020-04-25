import * as React from 'react';
import { hot } from 'react-hot-loader';
import { IParticipants } from './Participants.interface';
import { RootContainer } from './Participants.styles';

const ParticipantsComp: React.FunctionComponent<IParticipants> = (props => {


    return (
        <RootContainer></RootContainer>
    );
});

export const Participants = hot(module)(ParticipantsComp)