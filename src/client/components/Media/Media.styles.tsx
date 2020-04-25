import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';


export const RootContainer = styled.section`
    padding: 40px 20px;

`;

export const useStyles = makeStyles(theme => ({
    listitem: {
        padding: '15px 0'  
    }
}));