import styled from 'styled-components';
import { 
    AppBar as MuiAppbar,
    Toolbar as MuiToolbar 
} from '@material-ui/core';

export const Toolbar = styled(MuiToolbar)`
    background: none;
    border: none;
`;

export const AppBar = styled(MuiAppbar)`
    box-shadow: none;
    background: transparent;
`;