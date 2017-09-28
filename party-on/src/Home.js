import React from 'react';
import { Link } from 'react-router-dom';
import { HomeButton } from './HomeButton';
import styled from 'styled-components';
const HomePage = styled.div`
margin: 0 auto;
text-align: center;
margin-top: 220px;
`;


export const Home = () => {
    return (
        <div>
            <HomePage>
                {/* <h1>Welcome to Party Logic</h1> */}
                <p style={{fontSize: 45, fontFamily:'Bungee', color: '#4284D3', textTransform: 'uppercase' }}>Welcome to</p>
                <h1 style={{fontSize: 100, fontFamily:'Bungee Shade', color: '#4284D3', textTransform: 'uppercase', marginTop: 0 }}>Party Logic</h1>

                <HomeButton>
                    <Link to="/howtoplay" style={{ textDecoration: 'none', color: 'white' }}>
                        How to Play
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
            </HomePage>
        </div>
    );
}