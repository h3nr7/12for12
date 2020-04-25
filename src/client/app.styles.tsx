import styled from 'styled-components';
import { Typography, ListItem } from '@material-ui/core';
import { Link } from 'react-router-dom';
export const Heading = styled.h1`
    font-weight: normal;
    font-style: italic;
`;

export const MenuItem = styled(ListItem)`
    font-size: 1.2em;
    font-weight: 500;
`;

export const MenuLink = styled(Link)`
    color: black;
    text-decoration: none;
    &:hover {
        cursor: pointer;
        text-decoration: underline;
    }
`;