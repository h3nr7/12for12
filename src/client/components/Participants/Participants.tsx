import * as React from 'react';
import { hot } from 'react-hot-loader';

import { getPlayers } from '../../apis';
import { IParticipants } from './Participants.interface';
import { RootContainer } from './Participants.styles';

const ParticipantsComp: React.FunctionComponent<IParticipants> = (props => {

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

    return (
        <RootContainer>
            {JSON.stringify(players)}
        </RootContainer>
    );
});

export const Participants = hot(module)(ParticipantsComp)