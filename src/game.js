import React from 'react';
import Board from './board';

class Game extends React.Component {
    constructor(){
        super();
        this.state = {
            history: [{
                squares: [],
            }],
            currentPuzzleIndex: null,
            locked: [],
            stepNumber: 0,
            puzzlesSolved: 0,
            showHelp: false
        };
    }

    handleClick(i){
        const history = this.state.history;
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        let locked = this.state.locked;

        if( locked.indexOf(parseInt(i, 10)) !== -1 ) {
            return;
        }
		
        if(checkSolution(squares) === 'winner') {
            this.solved();
            return;
        }

        if(squares[i] === '#d3d3d3') {
            squares[i] = '#4284D3';
        }
        else if(squares[i] === '#4284D3') {
            squares[i] = '#FF1E00';
        }
        else if(squares[i] === '#FF1E00') {
            squares[i] = '#d3d3d3';
        }

        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
        });
    }
    
    solved(){
        const figuredOut = this.state.puzzlesSolved + 1;
        let num = getRandomIndex();
        if( num === this.state.currentPuzzleIndex ) {
            num = getRandomIndex();
        }
        
        let starters = [];
        starterBoards[num].forEach( (val, index) => {
            if( val !== '#d3d3d3' ) {
                return starters.push(index);
            } else {
                return null;
            }
        });

        this.setState({
            puzzlesSolved: figuredOut,
            history: [{
                squares: starterBoards[num],
            }],
            currentPuzzleIndex: num,
            locked: starters          
        });
    }

    jumpTo(step){
        const timeWarp = this.state.history.slice(0, (step) ? step : 1);
        this.setState({
            history: timeWarp
        });
    }
    
    componentWillMount() {
        if( !this.state.history[0].squares.length ) {
            const num = getRandomIndex();

            let starters = [];
            starterBoards[num].forEach( (val, index) => {
                if( val !== '#d3d3d3' ) {
                    return starters.push(index);
                } else {
                    return null;
                }
            });

            this.setState({
                history: [{
                    squares: starterBoards[num],
                }],
                currentPuzzleIndex: num,
                locked: starters
            });
        }
    }

    render() {
        const header = <h1> Party Logic </h1>;
        const history = this.state.history;
        const current = history[this.state.history.length - 1];
        const winner = checkSolution(current.squares);

        let status;

        if(winner === 'winner') {
            status =  (
                <div>
                    <div>You solved it!</div>
                    <button className="navigation" onClick={() => this.solved()}>Next Game</button>
                </div>
            );
        } else {
            status = winner;
        }
        
        return (
            <div className="game">
                <div>
                    {header}
                </div>
                <div className="game-board">
                    <Board 
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div className="errors">{status}</div>
                    <button className="navigation" onClick={() => this.jumpTo(history.length - 1)}>Undo</button>
                    <button className="navigation" onClick={() => this.jumpTo(0)}>Start Over</button>
                    <button className="navigation" onClick={() => this.setState({showHelp: !this.state.showHelp})}>How to Play</button>
                    <div>Puzzles Solved: {this.state.puzzlesSolved} </div>
                </div>
                <div>{this.state.showHelp && 
                    <p>Fill in all of the squares to move to the next round.
                        <li>No two rows are the same.</li> 
                        <li>Three squares of the same color are not allowed next to each other. </li> 
                    </p>
                }
                </div>
            </div>
        );
    }
}

function checkSolution(squares){
    const lines = [
        [0,1,2,3],
        [4,5,6,7],
        [8,9,10,11],
        [12,13,14,15],
        [0,4,8,12],
        [1,5,9,13],
        [2,6,10,14],
        [3,7,11,15]
    ];
    let result;

    for(let i = 0; i < lines.length; i++){
        const [a,b,c,d] = lines[i];
        if( squares[a] !== '#d3d3d3' && squares[a] === squares[b] && squares[b] === squares[c] ) return result = 'Three squares of the same color are not allowed next to each other.';
        if( squares[b] !== '#d3d3d3' && squares[b] === squares[c] && squares[c] === squares[d] ) return result = 'Three squares of the same color are not allowed next to each other.';
    }
        
    if( squares.filter( box => box !== '#d3d3d3' ).length === 16 ) {
        for( let i = 0; i < lines.length; i++ ){
            const line = lines[i];
            const [a,b,c,d] = lines[i];
            if( line.filter( index => squares[index] === '#4284D3').length !== 2 ) return result = 'Lines must have two of each color.';
            if( 0 <= i <= 3 ) {
                for( let j = i + 1; j < 4; j++ ) {
                    const [ e, f, g, h ] = lines[ (( j < 4) ? j + 1 : 0) ];
                    if( a === e && b === f && c === g && d === h ) return result = 'No two rows are the same.';
                }
            }
            if (4 <= i <= 7) {
                for (let j = i + 4; j < 7; j++) {
                    const [e, f, g, h] = lines[((j < 7) ? j + 1 : 4)];
                    if (a === e && b === f && c === g && d === h) return result = 'No two rows are the same.';
                }
            }
        }
        result = 'winner';
    }
    return result;
}

function getRandomIndex() {
    return Math.floor(Math.random()*5);
}

const starterBoards = [
    [
        '#FF1E00','#FF1E00','#d3d3d3','#d3d3d3',
        '#d3d3d3','#FF1E00','#d3d3d3','#d3d3d3',
        '#d3d3d3','#d3d3d3','#4284D3','#d3d3d3',
        '#d3d3d3','#d3d3d3','#d3d3d3','#d3d3d3',
    ],
    [
        '#d3d3d3','#d3d3d3','#FF1E00','#FF1E00',
        '#d3d3d3','#d3d3d3','#FF1E00','#d3d3d3',
        '#d3d3d3','#d3d3d3','#d3d3d3','#d3d3d3',
        '#4284D3','#d3d3d3','#d3d3d3','#d3d3d3',
    ],
    [
        '#d3d3d3','#d3d3d3','#FF1E00','#FF1E00',
        '#d3d3d3','#d3d3d3','#4284D3','#d3d3d3',
        '#d3d3d3','#d3d3d3','#d3d3d3','#FF1E00',
        '#d3d3d3','#FF1E00','#d3d3d3','#d3d3d3',
    ],
    [
        '#d3d3d3','#d3d3d3','#d3d3d3','#4284D3',
        '#4284D3','#4284D3','#d3d3d3','#d3d3d3',
        '#4284D3','#d3d3d3','#d3d3d3','#d3d3d3',
        '#d3d3d3','#FF1E00','#d3d3d3','#d3d3d3',
    ],
    [
        '#d3d3d3','#d3d3d3','#d3d3d3','#d3d3d3',
        '#d3d3d3','#d3d3d3','#FF1E00','#d3d3d3',
        '#4284D3','#4284D3','#d3d3d3','#d3d3d3',
        '#d3d3d3','#4284D3','#d3d3d3','#d3d3d3',
    ]
];


export default Game;