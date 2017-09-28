import React from 'react';

export default function Square(props){
    const {x, y} = props;
    const pos = { x, y };
    return (
        <td 
            className="square" 
            value={props.value}
            onClick={() => {
                props.onSquareClick(pos);
            }}
            style={{ backgroundColor: props.value}}
        >
        </td>
    );
}