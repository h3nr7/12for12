import * as React from 'react';
import { hot } from 'react-hot-loader';
import { IOrganisers } from './Organisers.interface';
import { RootContainer } from './Organisers.styles';

const OrganisersComp: React.FunctionComponent<IOrganisers> = (props) => {

    return (
        <RootContainer>
            
        </RootContainer>
    );
}

export const Organisers = hot(module)(OrganisersComp);