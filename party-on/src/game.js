import React from 'react';
import Board from './board';

class Game extends React.Component {
    constructor(){
        super();
        this.state = {
            history: [{
                squares: Array(16).fill('#d3d3d3'),
            }],
            xIsNext: true,
            stepNumber: 0
        };
    }
	
    handleClick(i){
        const history = this.state.history;
        const current = history[history.length - 1];
        const squares = current.squares.slice();
		
        // if(checkSolution(squares)) {
        //     return;
        // }

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
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        });
    }
	
    jumpTo(step){
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }
	
    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = checkSolution(current.squares);
		
        const moves = history.map((step, move) => {
            const desc = move ? 
                'move #' + move :
                'game start';
            return (
                <li key={move}>
                    <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
                </li>
            );
        });
        let status;
		
        if(winner) {
            status = 'winner:' + winner;
        }
        else{
            status = 'Next player:' + (this.state.xIsNext ? 'x' : 'o');
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
                    <div>{status}</div>
                    <ol>{moves}</ol>
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
                    const [e, f, g, h] = squares[((j < 7) ? j + 1 : 4)]
                    if (a === e && b === f && c === g && d === h) console.log('cannot have two matching lines');
                }
            }
        }
        result = 'winner';
    }
    return result;
}

export default Game;