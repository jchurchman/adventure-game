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
            puzzlesSolved: 0
        };
    }

    handleClick(i){
        const history = this.state.history;
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        const locked = this.state.locked;

        if( locked.indexOf(parseInt(i, 10)) !== -1 ) {
            return;
        }
		
        if(checkSolution(squares) === 'winner') {
            this.solved();
            return;
        }

        if(squares[i] === '#d3d3d3') {
            squares[i] = '#0000ff';
        }
        else if(squares[i] === '#0000ff') {
            squares[i] = '#ff0000';
        }
        else if(squares[i] === '#ff0000') {
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
        const history = this.state.history;
        const current = history[this.state.history.length - 1];
        const winner = checkSolution(current.squares);
        
        let status;

        if(winner === 'winner') {
            status =  (
                <div>
                    <div>You solved it!</div>
                    <button onClick={() => this.solved()}>Next Game</button>
                </div>
            );
        }
        
        return (
            <div className="game">
                <div className="game-board">
                    <Board 
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>Puzzles Solved: {this.state.puzzlesSolved} </div>
                    <button onClick={() => this.jumpTo(history.length - 1)}>Undo</button>
                    <button onClick={() => this.jumpTo(0)}>Start Over</button>
                    <div>{status}</div>
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
        if( squares[a] !== '#d3d3d3' && squares[a] === squares[b] && squares[b] === squares[c] ) return 'cannot have three squares in a row of the same color';
        if( squares[b] !== '#d3d3d3' && squares[b] === squares[c] && squares[c] === squares[d] ) return 'cannot have three squares in a row of the same color';
    }
        
    if( squares.filter( box => box !== '#d3d3d3' ).length === 16 ) {
        for( let i = 0; i < lines.length; i++ ){
            const line = lines[i];
            const [a,b,c,d] = lines[i];
            if( line.filter( index => squares[index] === '#0000ff').length !== 2 ) return result = 'lines must have two of each color';
            if( 0 <= i <= 3 ) {
                for( let j = 0; j < 3; j++ ) {
                    const [ e, f, g, h ] = squares[ ( (j < 3) ? j + 1 : 0) ];
                    if( a === e && b === f && c === g && d === h ) console.log('cannot have two matching lines');
                }
            }
            if (4 <= i <= 7) {
                for (let j = 4; j < 7; j++) {
                    const [e, f, g, h] = squares[((j < 7) ? j + 1 : 4)];
                    if (a === e && b === f && c === g && d === h) console.log('cannot have two matching lines');
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
        '#ff0000','#ff0000','#d3d3d3','#d3d3d3',
        '#d3d3d3','#ff0000','#d3d3d3','#d3d3d3',
        '#d3d3d3','#d3d3d3','#0000ff','#d3d3d3',
        '#d3d3d3','#d3d3d3','#d3d3d3','#d3d3d3',
    ],
    [
        '#d3d3d3','#d3d3d3','#ff0000','#ff0000',
        '#d3d3d3','#d3d3d3','#ff0000','#d3d3d3',
        '#d3d3d3','#d3d3d3','#d3d3d3','#d3d3d3',
        '#0000ff','#d3d3d3','#d3d3d3','#d3d3d3',
    ],
    [
        '#d3d3d3','#d3d3d3','#ff0000','#ff0000',
        '#d3d3d3','#d3d3d3','#0000ff','#d3d3d3',
        '#d3d3d3','#d3d3d3','#d3d3d3','#ff0000',
        '#d3d3d3','#ff0000','#d3d3d3','#d3d3d3',
    ],
    [
        '#d3d3d3','#d3d3d3','#d3d3d3','#0000ff',
        '#0000ff','#0000ff','#d3d3d3','#d3d3d3',
        '#0000ff','#d3d3d3','#d3d3d3','#d3d3d3',
        '#d3d3d3','#ff0000','#d3d3d3','#d3d3d3',
    ],
    [
        '#d3d3d3','#d3d3d3','#d3d3d3','#d3d3d3',
        '#d3d3d3','#d3d3d3','#ff0000','#d3d3d3',
        '#0000ff','#0000ff','#d3d3d3','#d3d3d3',
        '#d3d3d3','#0000ff','#d3d3d3','#d3d3d3',
    ]
];


export default Game;