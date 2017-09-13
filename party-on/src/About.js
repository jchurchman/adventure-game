import React from 'react';
import { Link } from 'react-router-dom';
import { HomeButton } from './HomeButton';
import styled from 'styled-components';

const Centered = styled.div`
margin: 0 auto;
margin-top: 220px;
text-align: center;
`;

export const About = () => {
    return(
        <div>
            <Centered>
            <p style={{fontSize: 60, fontFamily:'Bungee Shade', color: '#4284D3', textTransform: 'uppercase' }}>About</p>
            <p style={{fontSize: 18, fontFamily: 'Raleway', lineHeight: 2}}>
                Party Logic was created by 
                <span> </span>
                <a href="https://www.github.com/jchurchman" style={{textDecoration: 'none', color: 'black'}}>
                Joe Churchman and 
                </a> 
                <span> </span>
                <a href="https://www.github.com/merylturner" style={{textDecoration: 'none', color: 'black'}}>
                Meryl Turner.
                </a>
                </p>
                <hr style={{ width: 500, marginTop: 20 }}/>
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

            </Centered>
        </div>
    );
}