import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Game from './game';

function Home() {
    return(
        <div>
            <h1>Welcome to Party Logic</h1>
            <button className="navigation">How to Play</button>
            <button className="navigation"><Link to="/game">Let's Play!</Link></button>

        </div>
    );
}

class App extends Component {
    render(){
        return(
            <div>
                <Router>
                    <div>
                        {/* <div>
                            <li><Link to='/'>Home</Link></li>
                            <li><Link to='/game'>Play</Link></li>
                            {/* <li><Link to='/howtoplay'>How To Play</Link></li> */}
                        <Route exact path="/" component={Home}/>
                        <Route path="/game" component={Game}/>
                    </div>
                    {/* <Route path="/howtoplay" component={HowToPlay}/> */}

                </Router>
                {/* <Game /> */}
            </div>
        );
    }
}

export default App;