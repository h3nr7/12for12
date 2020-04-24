

import styled from 'styled-components';
import heroImg from './hero_img.jpg';
export const RootContainer = styled.div`
    display: block;
    position: relative;
`;

export const HeroContainer = styled.section`
    background-image: url(${heroImg});
    background-size: cover;
    background-position: center;
    background-color: rgba(0,0,0,0.5);
    background-blend-mode: multiply;
    display: flex;
    width: 100%;
    padding-top: 64px;
    height: 600px;
    overflow: hidden;
    @media (max-width: 960px) {
        height: 400px;
    }

    @media (max-width: 600px) {
        height: 400px;
    }

    @media (max-width: 400px) {
        height: 600px;
    }
`;

export const HeroHeading = styled.div`
    font-weight: bold;
    font-size: 2.6em;
    width: 800px;
    @media (max-width: 960px) {
        font-size: 2em;
        width: 600px;
    };

    @media (max-width: 600px) {
        font-size: 1.6em;
        width: 600px;
    };

    @media (max-width: 400px) {
        width: auto;
        font-size: 2.1em;
    };
    color: white;
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