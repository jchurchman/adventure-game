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
		
        // if(calculateWinner(squares)) {
        //     return;
        // }
        console.log('squares ', squares[i], 'i', i);
        if(squares[i] === '#d3d3d3') console.log(squares[i] === '#d3d3d3');

        if(squares[i] === '#d3d3d3') {
            squares[i] = '#0000ff';
        }
        else if(squares[i] === '#0000ff') {
            squares[i] = '#ff0000';
        }
        else if(squares[i] === '#ff0000') {
            squares[i] = '#d3d3d3';
        }
        console.log('history', this.state.history);

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
        const winner = calculateWinner(current.squares);
		
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

function calculateWinner(squares){
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
    for(let i = 0; i < lines.length; i++){
        const [a,b,c,d] = lines[i];
        if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
            return squares[a];
        }
    }
    return null;
}

export default Game;