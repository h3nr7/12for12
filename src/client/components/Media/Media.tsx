import * as React from 'react';
import { hot } from 'react-hot-loader';
import { IMedia } from './Media.interface';
import { RootContainer } from './Media.styles';

const MediaComponent: React.FunctionComponent<IMedia> = (props) => {


    return (
        <RootContainer>
            
        </RootContainer>
    );
};

export const Media = hot(module)(MediaComponent);