import * as React from 'react';
import { hot } from 'react-hot-loader';
import { IHome } from './home.interface';
import { Hero } from './home.styles';
const HomeComponent = ({}: IHome) => (
    <Hero>
        <h1>hello</h1>
    </Hero>
)

export const Home = hot(module)(HomeComponent);

