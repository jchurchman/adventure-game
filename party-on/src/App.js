import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Game from './game';
import styled from 'styled-components';
// import TransitionGroup from 'react-transition-group/TransitionGroup';

const Centered = styled.div`
    margin: 0 auto;
    text-align: center;
`;
const HomePage = styled.div`
    margin: 0 auto;
    text-align: center;
    margin-top: 220px;
`;

const Instructions = styled.div`
    margin: 0 auto;
    margin-top: 220px;
    text-align: center;
`;

const HomeButton = styled.button`
    cursor: pointer;
    font-family: 'Raleway', sans-serif;
    font-weight: 700;
    font-size: 15px;
    letter-spacing: 1px;
    border-radius: 4px;
    background-color: black;
    color: white;
    margin: 20px 10px;
    border: none;
    padding: 10px 20px;
    font-size: 12px;
    text-transform: uppercase;
    :focus {
        outline: none;
    }
`;

const ButtonWhite = styled.button`
    cursor: pointer;
    font-family: 'Raleway', sans-serif;
    font-weight: 700;
    font-size: 15px;
    color: black;
    background-color: white;
    letter-spacing: 1px;
    border-radius: 4px;
    margin: 20px 10px;
    border: none;
    padding: 10px 20px;
    font-size: 12px;
    text-transform: uppercase;
    :focus {
        outline: none;
    }
`;

function Home() {
    return (
        <div>
            <HomePage>
                {/* <h1>Welcome to Party Logic</h1> */}
                <p style={{fontSize: 60, fontFamily:'Bungee Inline' }}>Welcome to Party Logic</p>

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

function About(){
    return(
        <div>
            <Centered>
                <p style={{fontSize: 60, fontFamily:'Bungee Inline' }}>About</p>
                Party Logic was created by Joe Churchman & Meryl Turner.
                {/* create links of github accounts */}
                <hr style={{ width: 500, marginTop: 20 }}/>
                <HomeButton>
                    <Link to="/howtoplay" style={{ textDecoration: 'none', color: 'white' }}>
                        How to Play
                    </Link>
                </HomeButton>

            </Centered>
        </div>
    );
}
function GameComponent() {
    return (
        <div>
            <Centered>
                <ButtonWhite>
                    <Link to="/howtoplay" style={{ textDecoration: 'none', color: 'black' }}>
                        How to Play
                    </Link>
                </ButtonWhite>
                <ButtonWhite>
                    <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
                        Home
                    </Link>
                </ButtonWhite>
                <ButtonWhite>
                    <Link to="/about" style={{ textDecoration: 'none', color: 'black' }}>
                    About
                    </Link>
                </ButtonWhite>
            </Centered>
            <Game />
        </div>
    );
}
function HowToPlay() {
    return (
        <div>
            <Instructions>
                {/* <h1>How to Play</h1> */}
                <p style={{fontSize: 60, fontFamily:'Bungee Inline' }}>How to Play</p>
                <p>Fill in all of the squares to move to the next round.
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

class App extends Component {
    render() {
        return (
            <div>
                <Router>
                    <div>
                        <Route exact path="/" component={Home} />
                        <Route path="/game" component={GameComponent} />
                        <Route path="/about" component={About} />
                        <Route path="/howtoplay" component={HowToPlay} />
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;