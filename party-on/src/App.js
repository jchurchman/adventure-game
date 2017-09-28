import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Game from './game';
import { HowToPlay } from './HowToPlay';
import { About } from './About';
import { Home } from './Home';


class App extends Component {
    render() {
        return (
            <div>
                <Router>
                    <div>
                        <Route exact path="/" component={Home} />
                        <Route path="/game" component={Game} />
                        <Route path="/about" component={About} />
                        <Route path="/howtoplay" component={HowToPlay} />
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;