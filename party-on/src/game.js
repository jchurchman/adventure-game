import React from 'react';
import Board from './board';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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
&:focus {
    outline: none;
}
`;


class Game extends React.Component {
    constructor(){
        super();
        this.state = {
            history: [],
            currentPuzzleIndex: null,
            locked: [],
            stepNumber: 0,
            puzzlesSolved: 0,
            showHelp: false
        };
    }

    handleClick(pos){

        const { x, y } = pos;
        const history = this.state.history;
        const current = history[history.length - 1];
        const squares = current.slice();
        let locked = this.state.locked;

        function checkLock(position) {
            if(!locked[pos.y]) return -1;
            return locked[position.y].indexOf(position.x);
        }
        if( checkLock(pos) > -1 ) {
            return;
        }
		
        if(checkSolution(squares) === 'winner') {
            this.solved();
            return;
        }

        if(squares[y][x] === '#d3d3d3') {
            squares[y][x] = '#4284D3';
        }
        else if(squares[y][x] === '#4284D3') {
            squares[y][x] = '#FF1E00';
        }
        else if(squares[y][x] === '#FF1E00') {
            squares[y][x] = '#d3d3d3';
        }

        this.setState({
            history: history.concat([
                squares
            ]),
        });
    }
    
    solved(){
        const figuredOut = this.state.puzzlesSolved + 1;
        let num = getRandomIndex();
        if( num === this.state.currentPuzzleIndex ) {
            num = getRandomIndex();
        }
        
        let starters = {};
        starterBoards[num].forEach( (row, index) => {
            row.forEach((val, i) => {
                if( val !== '#d3d3d3' ) {
                    starters[index] ? starters[index].push(i) : starters[index] = [i];
                } else {
                    return null;
                }
            });
        });

        this.setState({
            puzzlesSolved: figuredOut,
            history: [ starterBoards[num] ],
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
        if( !this.state.history[0] ) {
            const num = getRandomIndex();

            let starters = {};
            starterBoards[num].forEach( (row, index) => {
                row.forEach((val, i) => {
                    if( val !== '#d3d3d3' ) {
                        starters[index] ? starters[index].push(i) : starters[index] = [i];
                    } else {
                        return null;
                    }
                });
            });

            this.setState({
                history: [ starterBoards[num] ],
                currentPuzzleIndex: num,
                locked: starters
            });
        }
    }

    render() {
        // const header = <p style={{fontSize: 60, fontFamily:'Bungee Shade', color: 'black', textTransform: 'uppercase', margin: '0 auto' }}>PL</p>;
        
        const history = this.state.history;
        const current = history[this.state.history.length - 1];
        const winner = checkSolution(current);

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
                {/* <div>
                    {header}
                </div> */}
                <div className="game-board">
                    <Board 
                        current={current}
                        onSquareClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div className="errors">{status}</div>
                    <button className="navigation" onClick={() => this.jumpTo(history.length - 1)}>Undo</button>
                    <button className="navigation" onClick={() => this.jumpTo(0)}>Start Over</button>
                    {/* <button className="navigation" onClick={() => this.setState({showHelp: !this.state.showHelp})}>How to Play</button> */}
                    <div>Puzzles Solved: {this.state.puzzlesSolved} </div>
                </div>
                <div>
                    <ButtonWhite>
                        <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
                        Home
                        </Link>
                    </ButtonWhite>
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
                    console.log('abcd',a,b,c,d, 'efgh', e,f,g,h, 'i', i, 'j', j);                    
                    if( a === e && b === f && c === g && d === h ) return result = 'No two rows are the same.';
                }
            }
            if (4 <= i <= 7) {
                for (let j = i + 4; j < 7; j++) {
                    const [e, f, g, h] = lines[((j < 7) ? j + 1 : 4)];
                    console.log('abcd',a,b,c,d, 'efgh', e,f,g,h, 'i', i, 'j', j);                    
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
        ['#FF1E00','#FF1E00','#d3d3d3','#d3d3d3'],
        ['#d3d3d3','#FF1E00','#d3d3d3','#d3d3d3'],
        ['#d3d3d3','#d3d3d3','#4284D3','#d3d3d3'],
        ['#d3d3d3','#d3d3d3','#d3d3d3','#d3d3d3'],
    ],
    [
        ['#d3d3d3','#d3d3d3','#FF1E00','#FF1E00'],
        ['#d3d3d3','#d3d3d3','#FF1E00','#d3d3d3'],
        ['#d3d3d3','#d3d3d3','#d3d3d3','#d3d3d3'],
        ['#4284D3','#d3d3d3','#d3d3d3','#d3d3d3'],
    ],
    [
        ['#d3d3d3','#d3d3d3','#FF1E00','#FF1E00'],
        ['#d3d3d3','#d3d3d3','#4284D3','#d3d3d3'],
        ['#d3d3d3','#d3d3d3','#d3d3d3','#FF1E00'],
        ['#d3d3d3','#FF1E00','#d3d3d3','#d3d3d3'],
    ],
    [
        ['#d3d3d3','#d3d3d3','#d3d3d3','#4284D3'],
        ['#4284D3','#4284D3','#d3d3d3','#d3d3d3'],
        ['#4284D3','#d3d3d3','#d3d3d3','#d3d3d3'],
        ['#d3d3d3','#FF1E00','#d3d3d3','#d3d3d3'],
    ],
    [
        ['#d3d3d3','#d3d3d3','#d3d3d3','#d3d3d3'],
        ['#d3d3d3','#d3d3d3','#FF1E00','#d3d3d3'],
        ['#4284D3','#4284D3','#d3d3d3','#d3d3d3'],
        ['#d3d3d3','#4284D3','#d3d3d3','#d3d3d3'],
    ]
];


export default Game;