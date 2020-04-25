import styled from 'styled-components';
import { Container, Typography, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const RootContainer = styled(Container)`
    padding: 40px 20px;
`;

export const CardNameField = styled(Typography)`
    font-size: 1.1em;
    margin-bottom: 10px;
`;

export const CardDesc = styled(Typography)`
    font-size: 0.8em;
    margin-top: 5px;
`;

export const CardText = styled(Typography)`
    font-size: 1em;
`;

export const CardAvatar = styled(Avatar)`
    width: 80px;
    height: 80px;
    @media (max-width: 600px) {
        display: none;
    }
`;

export const useStyles = makeStyles(theme => ({
    playerCard: {
        margin: '20px 0'
    },
    searchField: {
        marginBottom: 20    
    }
}));