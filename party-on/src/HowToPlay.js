import React from 'react';
import { Link } from 'react-router-dom';
import { HomeButton } from './HomeButton';
import styled from 'styled-components';


const Instructions = styled.div`
margin: 0 auto;
margin-top: 220px;
text-align: center;
`;

//create styled component of p titles
export const HowToPlay = () => {
    return (
        <div>
            <Instructions>
                <p style={{fontSize: 60, fontFamily:'Bungee Shade', color: '#4284D3', textTransform: 'uppercase' }}>How to Play</p>
                <p style={{fontSize: 18, fontFamily: 'Raleway', lineHeight: 2}}>Fill in all of the squares to move to the next round.
                    <li>No two rows are the same.</li>
                    <li>Three squares of the same color are not allowed next to each other. </li>
                </p>
                <HomeButton>
                    <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
                    Home
                    </Link>
                </HomeButton>
                <HomeButton>
                    <Link to="/game" style={{ textDecoration: 'none', color: 'white' }}>
                    Let's Play!
                    </Link>
                </HomeButton>
                <HomeButton>
                    <Link to="/about" style={{ textDecoration: 'none', color: 'white' }}>
                    About
                    </Link>
                </HomeButton>
            </Instructions>
        </div>
    );
}