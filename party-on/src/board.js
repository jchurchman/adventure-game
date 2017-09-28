import React from 'react';
import Square from './square';


function Board (props) {
    
    return (
        <table>
            <tbody>
                {props.squares.map( ( row, index ) => {
                    return (
                        <tr y={index} key={index}>
                            {row.map( ( val, i, row ) => {
                                return (<Square 
                                    key={i}
                                    x={i}
                                    y={index}
                                    value={val}
                                    onClick={props.onClick}
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