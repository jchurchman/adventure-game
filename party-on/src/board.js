import React from 'react';
import Square from './square';


function Board (props) {
    console.log(props);
    
    return (
        <table>
            <tbody>
                {props.current.map( ( row, index ) => {
                    return (
                        <tr y={index} key={index}>
                            {row.map( ( val, i, row ) => {
                                return (<Square 
                                    key={i}
                                    x={i}
                                    y={index}
                                    value={val}
                                    onSquareClick={(thing) => {
                                        return props.onSquareClick(thing);
                                    }}
                                />);}
                            )}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default Board;