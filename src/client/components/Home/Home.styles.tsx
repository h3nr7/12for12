import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';

export const RootContainer = styled.div`
    display: block;
    position: relative;
`;



export const JustGivingContainer = styled.section`
    width: 100%;
    height: auto;
    padding: 40px 28px;
`;

export const DataContainer = styled.section`
    display: flex;
    width: 100%;
    height: 600px;
    overflow: hidden;
`;

export const useStyles = makeStyles((theme) => ({
    donateBut: {
        marginTop: 20,
        width: '60%',
        marginBottom: 30,
        background: '#fc035e',
        [theme.breakpoints.down('xs')]: {
            margin: '30px 20%'
        }
    }
}));