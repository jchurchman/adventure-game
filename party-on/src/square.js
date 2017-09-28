import React from 'react';

export default function Square(props){
    return (
        <td 
            className="square" 
            value={props.value}
            x={props.x}
            y={props.y}
            onClick={(event) => props.onClick(event.target)}
            style={{ backgroundColor: props.value}}
        >
        </td>
    );
}